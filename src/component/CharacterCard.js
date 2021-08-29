import React, { useState } from 'react';
import { Dimensions, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import ImageColors from 'react-native-image-colors';

const cardWidth = ((Dimensions.get('screen').width - 40) / 2);

const CharacterCard = (props) => {
    const [background, setBackground] = useState('transparent');
    const character = props.character.item

    ImageColors.getColors(character.image, {
        fallback: 'transparent',
    }).then((data) => {
        setBackground(data.average)
    })

    return <TouchableOpacity onPress={() => { props.callbackModal(character, background) }}>
        <View
            style={[styles.cardContainer, { backgroundColor: background }]}>
            <Image
                style={styles.cardImage}
                source={{ uri: `${character.image}` }}
            />
            <Text
                style={styles.characterName}>
                {character.name}
            </Text>
        </View>
    </TouchableOpacity>


}

const styles = StyleSheet.create({
    cardContainer: {
        width: cardWidth,
        margin: 10,
        alignItems: 'center',
        borderRadius: 10,
        flexDirection: 'column'
    },
    cardImage: {
        width: cardWidth - 10,
        height: cardWidth - 10,
        marginTop: 5,
        borderRadius: 10
    },
    characterName: {
        margin: 5,
        fontWeight: 'bold',
    }
})

export default CharacterCard;