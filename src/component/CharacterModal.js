import React from 'react';
import {
    View, StyleSheet, Modal, Text,
    Image, Pressable, FlatList
} from 'react-native';


const CharacterModal = (props) => {

    const episodeList = []

    props.character.episode.forEach(element => {
        episodeList.push(element.replace('https://rickandmortyapi.com/api/episode/', ''))
    });

    const closeModal = () => {
        props.callbackModal({})
    }

    return <Modal style={styles.modal}
        animationType="slide"
        transparent={true}
        visible={true}>
        <Pressable
            style={styles.modal}
            onPress={() => { closeModal() }}>
            <View style={[styles.container, { backgroundColor: props.backgroundColor }]}>
                <Image
                    style={styles.image}
                    source={{ uri: `${props.character.image}` }}
                />
                <Text style={styles.name}>
                    {props.character.name}
                </Text>
                <View style={styles.statusTextContainer}>
                    {(props.character.status != "unknown") && <Text>{props.character.status}</Text>}
                    {(props.character.species != "unknown") && <Text>{props.character.species}</Text>}
                    {(props.character.type != "") && <Text>{props.character.type}</Text>}
                    {(props.character.gender != "unknown") && <Text>{props.character.gender}</Text>}
                </View>
                <FlatList
                    data={episodeList}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-evenly' }}
                    renderItem={(characterData) => {
                        return <View style={styles.episodeChip}>
                            <Text style={[styles.episodeChipTexts, { color: props.backgroundColor }]}
                            >{"Episode " + characterData.item}</Text>
                        </View>
                    }}
                />
            </View>
        </Pressable>
    </Modal>
}

const styles = StyleSheet.create({
    container: {
        width: "70%",
        height: "70%",
        borderRadius: 35
    },
    modal: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        height: "100%",
    },
    image: {
        width: "100%",
        height: "50%",
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35
    },
    name: {
        textAlign: 'center',
        fontSize: 22,
        margin: 5,
        fontFamily: 'monospace',
        fontWeight: 'bold'
    },
    statusTextContainer: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        marginBottom: 10,
        marginTop: 10
    },
    statusTexts: {

    },
    episodeChipTexts: {
        fontSize: 15,
    },
    episodeChip: {
        borderRadius: 50,
        borderColor: "#2E4057",
        borderWidth: 2,
        padding: 5,
        margin: 3,
        backgroundColor: "#2E4057"
    }
})

export default CharacterModal;