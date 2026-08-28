import { z } from "zod";

const addictionTypeSchema = z.enum([
  "drugs",
  "alcohol",
  "opioids",
  "gambling",
  "sex_porn",
  "screens_social_gaming",
  "dual_diagnosis",
  "behavioral",
]);

const serviceTypeSchema = z.enum([
  "medical_detox",
  "inpatient",
  "outpatient",
  "therapeutic_community",
  "day_center",
  "psychiatry",
  "medication",
  "individual_group",
  "family",
  "community_rehab",
  "vocational_rehab",
  "harm_reduction",
  "youth",
  "assessment",
  "referral",
]);

const sourceReferenceSchema = z.object({
  label: z.string().min(1),
  url: z.string().url(),
  sourceType: z.enum([
    "gov_il",
    "data_gov_il",
    "municipality",
    "health_fund",
    "hospital",
    "provider",
  ]),
});

export const addictionServiceSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  institutionType: z.enum(["public", "supervised_nonprofit", "supervised_private"]),
  operatorType: z.enum([
    "ministry_health",
    "ministry_welfare",
    "municipality",
    "health_fund",
    "public_hospital",
    "nonprofit",
    "private_company",
  ]),
  operatorName: z.string().optional(),
  region: z.enum(["national", "north", "center", "jerusalem", "south"]),
  city: z.string().min(1),
  address: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  addictions: z.array(addictionTypeSchema).min(1),
  services: z.array(serviceTypeSchema).min(1),
  population: z.array(z.string()).optional(),
  phone: z.array(z.string()).optional(),
  email: z.array(z.string()).optional(),
  website: z.string().url().optional(),
  supervisionText: z.string().min(1),
  officialSources: z.array(sourceReferenceSchema).min(1),
  notes: z.string().optional(),
  verifiedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export const addictionServicesArraySchema = z.array(addictionServiceSchema);

export type ValidatedAddictionService = z.infer<typeof addictionServiceSchema>;
