# Setup Amplify Environment Variables from .env file
# This script reads .env and uploads variables to AWS Amplify

param(
    [string]$AppId = "d331p3bg0d2tkb",
    [string]$BranchName = "stage",
    [string]$Region = "us-east-1",
    [string]$EnvFile = ".env"
)

Write-Host "Setting up Amplify environment variables for app: $AppId, branch: $BranchName" -ForegroundColor Cyan

# Check if .env file exists
if (-not (Test-Path $EnvFile)) {
    Write-Host "Error: $EnvFile not found!" -ForegroundColor Red
    exit 1
}

# Read .env file and parse variables
$envVars = @{}
Get-Content $EnvFile | ForEach-Object {
    $line = $_.Trim()
    # Skip empty lines and comments
    if ($line -and -not $line.StartsWith("#")) {
        # Split on first = only
        $parts = $line -split "=", 2
        if ($parts.Length -eq 2) {
            $key = $parts[0].Trim()
            $value = $parts[1].Trim()
            # Remove surrounding quotes if present
            $value = $value -replace '^["'']|["'']$', ''
            $envVars[$key] = $value
        }
    }
}

Write-Host "Found $($envVars.Count) environment variables to set:" -ForegroundColor Green
$envVars.Keys | ForEach-Object { Write-Host "  - $_" -ForegroundColor Gray }

# Build the environment variables JSON
$envJson = @{}
foreach ($key in $envVars.Keys) {
    $envJson[$key] = $envVars[$key]
}

$jsonString = $envJson | ConvertTo-Json -Compress

# Create a temporary file for the JSON
$tempFile = [System.IO.Path]::GetTempFileName()
$jsonString | Out-File -FilePath $tempFile -Encoding UTF8 -NoNewline

try {
    # First, try to get current branch info to see if it exists
    Write-Host "`nChecking if branch '$BranchName' exists..." -ForegroundColor Cyan
    $branchCheck = aws amplify get-branch --app-id $AppId --branch-name $BranchName --region $Region 2>&1

    if ($LASTEXITCODE -ne 0) {
        Write-Host "Branch '$BranchName' does not exist in Amplify yet." -ForegroundColor Yellow
        Write-Host "Creating branch in Amplify..." -ForegroundColor Cyan

        # Create the branch with environment variables
        aws amplify create-branch `
            --app-id $AppId `
            --branch-name $BranchName `
            --stage DEVELOPMENT `
            --framework "Next.js - SSR" `
            --enable-auto-build `
            --environment-variables "file://$tempFile" `
            --region $Region

        if ($LASTEXITCODE -eq 0) {
            Write-Host "Branch '$BranchName' created successfully with environment variables!" -ForegroundColor Green
        } else {
            Write-Host "Failed to create branch. Error code: $LASTEXITCODE" -ForegroundColor Red
            exit 1
        }
    } else {
        Write-Host "Branch '$BranchName' exists. Updating environment variables..." -ForegroundColor Cyan

        # Update existing branch with environment variables
        aws amplify update-branch `
            --app-id $AppId `
            --branch-name $BranchName `
            --environment-variables "file://$tempFile" `
            --region $Region

        if ($LASTEXITCODE -eq 0) {
            Write-Host "Environment variables updated successfully!" -ForegroundColor Green
        } else {
            Write-Host "Failed to update environment variables. Error code: $LASTEXITCODE" -ForegroundColor Red
            exit 1
        }
    }

    # Start a new build/deployment
    Write-Host "`nStarting deployment for branch '$BranchName'..." -ForegroundColor Cyan
    $buildResult = aws amplify start-job `
        --app-id $AppId `
        --branch-name $BranchName `
        --job-type RELEASE `
        --region $Region `
        --output json | ConvertFrom-Json

    if ($LASTEXITCODE -eq 0) {
        $jobId = $buildResult.jobSummary.jobId
        Write-Host "Deployment started! Job ID: $jobId" -ForegroundColor Green
        Write-Host "`nYou can monitor the deployment at:" -ForegroundColor Cyan
        Write-Host "https://$Region.console.aws.amazon.com/amplify/home?region=$Region#/$AppId/$BranchName/$jobId" -ForegroundColor White
        Write-Host "`nOr check status with:" -ForegroundColor Cyan
        Write-Host "aws amplify get-job --app-id $AppId --branch-name $BranchName --job-id $jobId --region $Region" -ForegroundColor White
    } else {
        Write-Host "Failed to start deployment." -ForegroundColor Red
    }

} finally {
    # Clean up temp file
    if (Test-Path $tempFile) {
        Remove-Item $tempFile -Force
    }
}

Write-Host "`nDone!" -ForegroundColor Green
