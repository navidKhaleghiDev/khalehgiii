export function MonitoringPage() {
  return (
    <iframe
      width="100%"
      height="100%"
      className="h-screen"
      src={import.meta.env.VITE_MONITORING_SRC}
      title="Monitoring"
    />
  );
}
