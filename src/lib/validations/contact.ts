import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  role: z.string().optional(),
  service: z.string().min(1, 'Please select a service'),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(20, 'Please provide more detail (at least 20 characters)'),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

export const assessmentFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  answers: z.record(z.string(), z.number().min(1).max(5)),
  score: z.number(),
  readinessLevel: z.string(),
})

export type AssessmentFormData = z.infer<typeof assessmentFormSchema>
