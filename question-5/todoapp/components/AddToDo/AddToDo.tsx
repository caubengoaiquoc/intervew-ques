import { Feather } from "@expo/vector-icons";
import { AlertDialog, Box, Button, Center, Heading, HStack, Icon, IconButton, Input, VStack } from "native-base";
import React, { FunctionComponent, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import CheckBox from 'expo-checkbox';
import mockData from "../../mockData.json";
import styles from "./styles";

const AddToDo: FunctionComponent = (props) => {

    const [list, setList] = useState({} as any);
    const [statusChange, setstatusChange] = useState(false);
    const [inputValue, setInputValue] = React.useState("");
    const [isOpen, setisOpen] = useState(false);
    const cancelRef = React.useRef(null);

    useEffect(() => {
        setList(mockData);
    }, []);

    const addItem = (name: any) => {
        setList({
            ...list,
            [Object.keys(list).length + 1]: {
                name: name,
                isCompleted: false
            }
        });
    };

    const handleStatusChange = (id: keyof typeof mockData) => {
        setList({
            ...list,
            [id]: {
                ...list[id],
                isCompleted: !list[id].isCompleted
            }
        });
    };

    const renderItem = ({ item }: any) => {
        const id = item as keyof typeof mockData;
        const data = list[id];
        return (
            <View key={id} style={styles.item}>
                <CheckBox
                    color={data.isCompleted ? '#08b6d3' : undefined}
                    onValueChange={() => handleStatusChange(id)} value={data.isCompleted} />
                <Text
                    style={{
                        color: data.isCompleted ? "#BDBDBD" : "#747577",
                        textDecorationLine: data.isCompleted ? "line-through" : "none",
                        marginLeft: 5
                    }}>
                    {data.name}
                </Text>
            </View>
        )
    }

    const closeAlert = () => {
        setisOpen(false)
    }

    const clearlist = () => {
        if (Object.keys(list)?.length > 0) {
            for (const id of Object.keys(list)) {
                const item = list[id];
                if (item.isCompleted) {
                    delete list[id];
                }
            }
        }
        closeAlert();
    }

    const renderAlert = () => {
        return (<AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={closeAlert}>
            <AlertDialog.Content>
                <AlertDialog.CloseButton />
                <AlertDialog.Header>Delete all task</AlertDialog.Header>
                <AlertDialog.Body>
                    This will remove all task. Deleted data can not be recovered.
                </AlertDialog.Body>
                <AlertDialog.Footer>
                    <Button.Group space={2}>
                        <Button variant='unstyled' colorScheme='coolGray' onPress={closeAlert} ref={cancelRef}>
                            Cancel
                        </Button>
                        <Button colorScheme='danger' onPress={clearlist}>
                            Delete
                        </Button>
                    </Button.Group>
                </AlertDialog.Footer>
            </AlertDialog.Content>
        </AlertDialog>)
    }

    return (
        <View style={styles.container}>
            <Box maxW="300" w="100%">
                <Heading mb="2" size="md">
                    Todo
                </Heading>
                <VStack space={4}>
                    <HStack space={2}>
                        <Input flex={1} onChangeText={v => setInputValue(v)} value={inputValue} placeholder="Add Task" />
                        <IconButton
                            disabled={!inputValue}
                            borderRadius="sm" variant="solid" icon={<Icon as={Feather} name="plus" size="sm" color="warmGray.50" />} onPress={() => {
                                addItem(inputValue);
                                setInputValue("");
                            }} />
                    </HStack>
                    <Button colorScheme="danger" onPress={() => setisOpen(true)}>
                        Clear all finished task
                    </Button>
                    {renderAlert()}
                </VStack>
                <FlatList
                    contentContainerStyle={styles.contentContainer}
                    removeClippedSubviews={false}
                    data={Object.keys(list)}
                    renderItem={renderItem}
                    keyExtractor={item => item}
                    ListEmptyComponent={() => {
                        return (
                            <Center>
                                No task to do
                            </Center>
                        )
                    }}
                />
            </Box>
        </View>)
}

export default AddToDo;