import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { get } from '~/libs/api';

interface Response {
  target_id: number;
  nickname: string;
  position: string;
}

const useGetUserInfoBySurveyId = (surveyId: string, options?: UseQueryOptions<Response>) => {
  return useQuery<Response>({
    queryKey: ['user', surveyId],
    // TODO: mock 제거
    queryFn: () => get<Response>(`https://dev.nalab.me/mock/users?survey-id=${surveyId}`),
    ...options,
  });
};

export default useGetUserInfoBySurveyId;