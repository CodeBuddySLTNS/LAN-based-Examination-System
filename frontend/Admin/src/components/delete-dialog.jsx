import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import PropTypes from "prop-types";

export default function DeleteDialog({
  open,
  setOpen,
  action,
  actionData,
  message,
}) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {message ||
              `This action cannot be undone. This will permanently delete the data
            from our servers.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() =>
              action({
                id: actionData?.id,
                username: actionData?.username,
                action: "delete",
              })
            }
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

DeleteDialog.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  action: PropTypes.func,
  actionData: PropTypes.object,
  message: PropTypes.string,
};
