import dns from "dns/promises";

try {
  const result = await dns.resolveSrv(
    "_mongodb._tcp.taskflowcluster.wq1czuz.mongodb.net"
  );

  console.log(result);
} catch (err) {
  console.error(err);
}