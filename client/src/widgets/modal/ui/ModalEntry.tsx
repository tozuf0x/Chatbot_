import { modeSelector } from '@/entities/guidance';
import { useAppSelector } from '@/shared/lib';
import { AddGuidanceModal } from './AddGuidanceModal';
import { DeleteGuidanceModal } from './DeleteGuidanceModal';
import { EditGuidanceModal } from './EditGuidanceModal';
import { Mode } from '@/const';

export function ModalEntry() {
  const mode = useAppSelector(modeSelector);

  if (mode === Mode.Add) {
    return <AddGuidanceModal />;
  }

  if (mode === Mode.Edit) {
    return <EditGuidanceModal />;
  }

  if (mode === Mode.Delete) {
    return <DeleteGuidanceModal />;
  }

  return null;
}
