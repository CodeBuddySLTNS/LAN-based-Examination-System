import { Text } from "react-native";
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

const ShowAlert = ({ title, description, open, okayFn, closeFn }) => {
  return (
    <AlertDialog isOpen={open} onClose={closeFn}>
      <AlertDialogBackdrop />
      <AlertDialogContent className="px-5 py-3.5 gap-2">
        <AlertDialogHeader>
          <Text className="font-Nunito-Bold text-xl">{title}</Text>
        </AlertDialogHeader>
        <AlertDialogBody>
          <Text className="font-Nunito-Regular">{description}</Text>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button onPress={closeFn}>
            <Text className="font-Nunito-SemiBold text-lg">Cancel</Text>
          </Button>
          <Button onPress={okayFn}>
            <Text className="font-Nunito-SemiBold text-lg">Proceed</Text>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ShowAlert;
