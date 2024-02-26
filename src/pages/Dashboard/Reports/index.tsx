import {
  MultiDatePicker,
  convertI2ToAD,
} from '@ui/atoms/Inputs/MultiDatePicker';
import { useForm } from 'react-hook-form';
// import useSWR from 'swr';

export function Reports() {
  const { control, watch } = useForm({
    mode: 'onChange',
  });
  console.log(
    convertI2ToAD(watch('startedDate')),
    convertI2ToAD(watch('endedDate'))
  );
  // const { data, isLoading, mutate } = useSWR<
  //   PaginationResponseSwr<IMyLearner[]>
  // >(
  //   E_AI_MY_LEARNER_PAGINATION({
  //     page: currentPage,
  //     pageSize: LIMIT_MU_LISTENER_LIST,
  //     time_from: convertI2ToAD(watch('startDate'), 'YYYY-MM-DD'),
  //     time_to: convertI2ToAD(watch('endDate'), 'YYYY-MM-DD'),
  //     listener_id: watch('listener_id'),
  //   }),
  //   http.fetcherSWR,
  //   {
  //     revalidateOnFocus: false,
  //     errorRetryCount: 0,
  //   }
  // );
  return (
    <div className="grid grid-cols-12 gap-4 bg-slate-400 w-full h-screen">
      <div className="col-span-3 lg:col-span-4">
        <MultiDatePicker
          control={control}
          placeholder="endedDate"
          id="endedDate"
          name="endedDate"
          format="YYYY-MM-DD"
          fullWidth
        />
      </div>
      <div className="col-span-3 lg:col-span-4">
        <MultiDatePicker
          control={control}
          placeholder="startedDate"
          id="startedDate"
          name="startedDate"
          format="YYYY-MM-DD"
          fullWidth
        />
      </div>
    </div>
  );
}
