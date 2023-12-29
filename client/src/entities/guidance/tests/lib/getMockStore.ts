import { Mode } from '@/const';

export const getMockStore = (
  guidances: IGuidanceData[] = []
): Pick<State, 'guidance'> => ({
  guidance: {
    mode: Mode.Idle,
    selectedGuidances: guidances,
  },
});
