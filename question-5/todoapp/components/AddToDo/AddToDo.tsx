import { Feather } from "@expo/vector-icons";
import { Box, Center, Checkbox, Heading, HStack, Icon, IconButton, Input, VStack } from "native-base";
import React, { FunctionComponent, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import mockData from "../../mockData.json";
import styles from "./styles";

const AddToDo: FunctionComponent = (props) => {

    const [list, setList] = useState({} as any);
    const [statusChange, setstatusChange] = useState(false);
    const [inputValue, setInputValue] = React.useState("");

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
        const item = list[id];
        item.isCompleted = !item.isCompleted;
        setList({
            ...list,
            [id]: item
        });
    };
    
    const renderItem = (item: any) => {
        const id = item.item as keyof typeof mockData;
        const data = list[id];        
        return (
            <View style={styles.item}>
                <Checkbox isChecked={data.isCompleted} onChange={() => handleStatusChange(id)} value={data.name}>
                    <Text
                    style = {{
                        color: data.isCompleted ? "#BDBDBD" : "#747577",
                        textDecorationLine: data.isCompleted ? "line-through" : "none",
                        marginLeft: 5
                    }}>
                        {data.name}
                    </Text>
                </Checkbox>
            </View>
        )
    }

    return (
        <Center style={styles.container} w="100%">
            <Box maxW="300" w="100%">
                <Heading mb="2" size="md">
                    Todo
                </Heading>
                <VStack space={4}>
                    <HStack space={2}>
                        <Input flex={1} onChangeText={v => setInputValue(v)} value={inputValue} placeholder="Add Task" />
                        <IconButton borderRadius="sm" variant="solid" icon={<Icon as={Feather} name="plus" size="sm" color="warmGray.50" />} onPress={() => {
                            addItem(inputValue);
                            setInputValue("");
                        }} />
                    </HStack>
                    <FlatList
                        data={Object.keys(list)}
                        renderItem={renderItem}
                        keyExtractor={item => item}
                    />
                </VStack>
            </Box>
        </Center>)
}

export default AddToDo;