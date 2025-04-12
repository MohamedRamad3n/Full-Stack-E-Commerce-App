import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
interface IModalProps {
  open: boolean;
  close: (isOpen: boolean) => void;
  title: string;
  children: React.ReactNode;
  okTxt?: string;
  onConfirm?: () => void;
  isLoading?: boolean;
}
const Modal: React.FC<IModalProps> = ({
  open,
  close,
  title,
  children,
  okTxt,
  onConfirm,
  isLoading,
}) => {
  return (
    <Dialog.Root
      lazyMount
      open={open}
      onOpenChange={(isOpen) => close(!isOpen)}
    >
      <Portal>
        <Dialog.Backdrop
          bg="blackAlpha.500"
          hueRotate={"90deg"}
          backdropFilter="blur(4px)"
        />
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>{children}</Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button loading={isLoading} onClick={onConfirm}>
                {okTxt}
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default Modal;
