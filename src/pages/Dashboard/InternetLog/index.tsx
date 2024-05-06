import { ContainerDashboard } from '@ui/Templates/ContainerDashboard';
import { BackButton } from '@ui/atoms/BackButton';

export function InternetLog() {
  return (
    <ContainerDashboard>
      <div className="flex w-full items-center justify-center  relative mt-40">
        <iframe
          className="w-full h-screen scale-125"
          src={import.meta.env.VITE_SARG_BASE_URL}
          title="sarg"
        />
      </div>
      <BackButton withLabel className="absolute bottom-20 left-24" />
    </ContainerDashboard>
  );
}
