import { BASEAPIMODULES } from "../constants";
import { APIVersions } from "store/authentication";
/*
console.log(compareVersion("0.20.7", "0.20.8")); // -1
console.log(compareVersion("0.20.9", "0.20.8")); // 1
console.log(compareVersion("0.20.08", "0.20.8")); // 0
console.log(compareVersion("0.20.08", "0.20.8.1")); // -1
console.log(compareVersion("0.20.8.1", "0.20.8")); // 1
console.log(compareVersion("0.020", "0.20")); // 0
console.log(compareVersion(0.1, 0.2)); // false
console.log(compareVersion("0", "0")); // 0
console.log(compareVersion("0.1", true)); // false*/
function compareVersion(v1, v2): number {
  if (typeof v1 !== "string") return false;
  if (typeof v2 !== "string") return false;
  v1 = v1.split(".");
  v2 = v2.split(".");
  const k = Math.min(v1.length, v2.length);
  for (let i = 0; i < k; ++i) {
    v1[i] = parseInt(v1[i], 10);
    v2[i] = parseInt(v2[i], 10);
    if (v1[i] > v2[i]) return 1;
    if (v1[i] < v2[i]) return -1;
  }
  return v1.length == v2.length ? 0 : v1.length < v2.length ? -1 : 1;
}

function isValidAPIVersion(version, apiName): boolean {
  if (apiName === "apiProviders") {
    return compareVersion(BASEAPIMODULES.providerAPIVersion, version) >=0;
  }

  if (apiName === "apiConsumers") {
    return compareVersion(BASEAPIMODULES.consumerAPIVersion, version) >=0 ;
  }

  if (apiName === "apiUsers" || apiName === "apiUsersWithoutAuthentication") {
    return compareVersion(BASEAPIMODULES.usersAPIVersion, version) >=0;
  }
  throw "Invalid API specified";
}

function isAnyAPIVersionOutdated(apiVersions: APIVersions): boolean {
  return (
    !isValidAPIVersion(apiVersions.provider, "apiProviders") ||
    !isValidAPIVersion(apiVersions.users, "apiUsers") ||
    !isValidAPIVersion(apiVersions.consumer, "apiConsumers")
  );
}

export { compareVersion, isValidAPIVersion, isAnyAPIVersionOutdated };
