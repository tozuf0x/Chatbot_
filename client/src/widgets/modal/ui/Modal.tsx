import { modeSelector } from '@/entities/guidance';
import { useAppSelector } from '@/shared/lib';
import { AddGuidanceModal } from './AddGuidanceModal';
import { Mode } from '@/const';

export function Modal() {
  const mode = useAppSelector(modeSelector);

  if (mode === Mode.Add) {
    return <AddGuidanceModal />;
  }

  //!TODO: добавить компонент модалки редачинга рекомендации
  // if (mode === Mode.Edit) {
  //   return <EditGuidanceModal />;
  // }

  //!TODO: добавить компонент модалки удаления рекомендации(й)
  // if (mode === Mode.Delete) {
  //   return <DeleteGuidanceModal />;
  // }

  return null;
}
