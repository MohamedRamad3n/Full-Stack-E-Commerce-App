import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
interface AlertDialogProps {
  isOpen: boolean;
  closeDialog: () => void;
  title: string;
  dec: string;
  OkTxt: string;
  CancelTxt: string;
  isLoading?: boolean;
  onDelete: () => void; 
}

const AlertDialog = ({
  isOpen,
  closeDialog,
  title,
  dec,
  OkTxt,
  CancelTxt,
  isLoading,
  onDelete,
}: AlertDialogProps) => {
  return (
    <>
      <Dialog.Root open={isOpen} onOpenChange={closeDialog}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>{title}</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <p>{dec}</p>
              </Dialog.Body>
              <Dialog.Footer>
                <Button variant="outline" onClick={closeDialog}>
                  {CancelTxt}
                </Button>
                <Button
                  colorScheme="red"
                  onClick={onDelete}
                  loading={isLoading}
                >
                  {OkTxt}
                </Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
};

export default AlertDialog;
