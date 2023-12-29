export const modeSelector = (state: Pick<State, 'guidance'>) => state.guidance.mode;
export const selectedGuidancesSelector = (state: Pick<State, 'guidance'>) => state.guidance.selectedGuidances;
