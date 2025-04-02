import { Pressable, Text, View } from "react-native";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "./ui/modal";
import { Icon } from "./ui/icon";
import { House, X } from "lucide-react-native";
import { HStack } from "./ui/hstack";
import { useRouter } from "expo-router";

const ShowResults = ({ isOpen, close }) => {
  const router = useRouter();

  const handleAction = () => {
    router.dismissAll();
    router.replace("/(drawer)/home");
    close(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={close}>
      <ModalBackdrop />
      <ModalContent>
        <Pressable
          className="absolute top-3 right-3"
          onPress={() => close(false)}
        >
          <Icon size="xl" as={X} />
        </Pressable>
        <ModalHeader>
          <Text className="flex-1 font-Nunito-Bold text-2xl text-center">
            Results
          </Text>
        </ModalHeader>
        <ModalBody>
          <View className="p-2 items-center rounded bg-gray-200">
            <Text className="font-Nunito-SemiBold">Your Score:</Text>
            <Text className="font-Nunito-Bold text-2xl">15 / 30</Text>
          </View>
        </ModalBody>
        <ModalFooter>
          <HStack className="flex-1 justify-center">
            <Pressable
              className="flex-row gap-1.5 items-center p-2 px-3 rounded-md bg-primary"
              onPress={handleAction}
            >
              <Icon size="lg" as={House} color="white" />
              <Text className="font-Nunito-Bold text-white">HOME</Text>
            </Pressable>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ShowResults;
