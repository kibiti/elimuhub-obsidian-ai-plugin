import fs from "fs";
const manifest = JSON.parse(fs.readFileSync("manifest.json", "utf-8"));
const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
const versions = JSON.parse(fs.readFileSync("versions.json", "utf-8"));

const newVersion = process.argv[2];
if (!newVersion) {
  console.error("Usage: node version-bump.mjs <new-version>");
  process.exit(1);
}

manifest.version = newVersion;
pkg.version = newVersion;
versions[newVersion] = manifest.minAppVersion;

fs.writeFileSync("manifest.json", JSON.stringify(manifest, null, 2));
fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2));
fs.writeFileSync("versions.json", JSON.stringify(versions, null, 2));
console.log(`Version bumped to ${newVersion}`);
