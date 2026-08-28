export type AddictionType =
  | "drugs"
  | "alcohol"
  | "opioids"
  | "gambling"
  | "sex_porn"
  | "screens_social_gaming"
  | "dual_diagnosis"
  | "behavioral";

export type ServiceType =
  | "medical_detox"
  | "inpatient"
  | "outpatient"
  | "therapeutic_community"
  | "day_center"
  | "psychiatry"
  | "medication"
  | "individual_group"
  | "family"
  | "community_rehab"
  | "vocational_rehab"
  | "harm_reduction"
  | "youth"
  | "assessment"
  | "referral";

export type InstitutionType =
  | "public"
  | "supervised_nonprofit"
  | "supervised_private";

export type OperatorType =
  | "ministry_health"
  | "ministry_welfare"
  | "municipality"
  | "health_fund"
  | "public_hospital"
  | "nonprofit"
  | "private_company";

export type Region =
  | "national"
  | "north"
  | "center"
  | "jerusalem"
  | "south";

export interface SourceReference {
  label: string;
  url: string;
  sourceType:
    | "gov_il"
    | "data_gov_il"
    | "municipality"
    | "health_fund"
    | "hospital"
    | "provider";
}

export interface AddictionService {
  id: string;
  name: string;
  institutionType: InstitutionType;
  operatorType: OperatorType;
  operatorName?: string;
  region: Region;
  city: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  addictions: AddictionType[];
  services: ServiceType[];
  population?: string[];
  phone?: string[];
  email?: string[];
  website?: string;
  supervisionText: string;
  officialSources: SourceReference[];
  notes?: string;
  verifiedAt: string;
}

export type SortOption =
  | "relevance"
  | "name"
  | "city"
  | "region"
  | "public_first"
  | "distance";

export interface FilterState {
  institutionType: InstitutionType | "all";
  operatorType: OperatorType | "all";
  region: Region | "all";
  addictions: AddictionType[];
  services: ServiceType[];
  population: string[];
  includeSupervised: boolean;
  publicOnly: boolean;
}

export const DEFAULT_FILTERS: FilterState = {
  institutionType: "all",
  operatorType: "all",
  region: "all",
  addictions: [],
  services: [],
  population: [],
  includeSupervised: true,
  publicOnly: false,
};

export const ADDICTION_LABELS: Record<AddictionType, string> = {
  drugs: "סמים",
  alcohol: "אלכוהול",
  opioids: "תרופות / אופיואידים",
  gambling: "הימורים",
  sex_porn: "מין / פורנוגרפיה",
  screens_social_gaming: "מסכים / רשתות / גיימינג",
  dual_diagnosis: "תחלואה כפולה",
  behavioral: "התמכרויות התנהגותיות",
};

export const SERVICE_LABELS: Record<ServiceType, string> = {
  medical_detox: "גמילה רפואית",
  inpatient: "אשפוזית",
  outpatient: "טיפול אמבולטורי",
  therapeutic_community: "קהילה טיפולית",
  day_center: "מרכז יום",
  psychiatry: "פסיכיאטריה",
  medication: "טיפול תרופתי",
  individual_group: "טיפול פרטני / קבוצתי",
  family: "טיפול משפחתי",
  community_rehab: "שיקום בקהילה",
  vocational_rehab: "שיקום תעסוקתי",
  harm_reduction: "הפחתת נזקים",
  youth: "טיפול נוער",
  assessment: "הערכה ואבחון",
  referral: "הפניה וייעוץ",
};

export const REGION_LABELS: Record<Region, string> = {
  national: "ארצי",
  north: "חיפה והצפון",
  center: "תל אביב והמרכז",
  jerusalem: "ירושלים",
  south: "דרום",
};

export const INSTITUTION_TYPE_LABELS: Record<InstitutionType, string> = {
  public: "ציבורי",
  supervised_nonprofit: "מלכ״ר מפוקח",
  supervised_private: "פרטי מפוקח",
};

export const OPERATOR_TYPE_LABELS: Record<OperatorType, string> = {
  ministry_health: "משרד הבריאות",
  ministry_welfare: "משרד הרווחה",
  municipality: "רשות מקומית",
  health_fund: "קופת חולים",
  public_hospital: "בית חולים ציבורי",
  nonprofit: "עמותה / מלכ״ר",
  private_company: "חברה פרטית",
};

export const POPULATION_OPTIONS = [
  "מבוגרים",
  "נוער",
  "צעירים",
  "נשים",
  "גברים",
  "משפחות",
  "קהילת להט״ב",
  "תחלואה כפולה",
] as const;
