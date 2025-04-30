import { cpus, homedir, userInfo } from "node:os";

export const getOSInfo = (flag) => {
  try {
    switch (flag) {
      case "EOL":
        const eol = JSON.stringify(os.EOL);
        console.log(`End-Of-Line: ${eol}`);
        break;

      case "cpus":
        const noOfCPUs = cpus();
        console.log(`Overall amount of CPUs: ${noOfCPUs.length}`);

        noOfCPUs.forEach((cpu, index) => {
          // Convert clock rate from MHz to GHz
          const clockRateGHz = cpu.speed / 1000;
          console.log(
            `CPU ${index + 1}: ${cpu.model} (${clockRateGHz.toFixed(2)} GHz)`
          );
        });

      case "homedir":
        console.log(`Home directory: ${homedir()}`);
        break;

      case "username":
        console.log(`System Username: ${userInfo().username}`);
        break;

      case "architecture":
        console.log(`CPU Architecture: ${process.arch}`);
        break;

      default:
        console.log("Invalid flag: ", flag);
    }
  } catch (error) {
    console.error("Error retrieving OS information:", error);
  }
};
