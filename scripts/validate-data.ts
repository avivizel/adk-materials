#!/usr/bin/env tsx
import rawData from "../src/data/addiction-services.json";
import { addictionServicesArraySchema } from "../src/lib/validation";

function main() {
  console.log("Validating addiction services dataset...\n");

  const result = addictionServicesArraySchema.safeParse(rawData);

  if (!result.success) {
    console.error("❌ Validation failed:\n");
    result.error.issues.forEach((issue) => {
      const path = issue.path.join(".");
      console.error(`  [${path}] ${issue.message}`);
    });
    process.exit(1);
  }

  const services = result.data;
  const publicCount = services.filter((s) => s.institutionType === "public").length;
  const supervisedCount = services.filter(
    (s) => s.institutionType === "supervised_nonprofit" || s.institutionType === "supervised_private"
  ).length;
  const regions = new Set(services.map((s) => s.region));

  const urlResults = services.flatMap((s) =>
    s.officialSources.map((src) => ({ id: s.id, url: src.url }))
  );

  console.log("✅ Validation passed!\n");
  console.log(`  Total institutions: ${services.length}`);
  console.log(`  Public services: ${publicCount}`);
  console.log(`  Supervised external: ${supervisedCount}`);
  console.log(`  Regions covered: ${regions.size}`);
  console.log(`  Source URLs: ${urlResults.length} (format validated)`);
  console.log(`\n  Regions: ${[...regions].join(", ")}`);

  const ids = services.map((s) => s.id);
  const duplicateIds = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (duplicateIds.length > 0) {
    console.error(`\n❌ Duplicate IDs found: ${duplicateIds.join(", ")}`);
    process.exit(1);
  }

  console.log("\n✅ All checks passed.");
}

main();
