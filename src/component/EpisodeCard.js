import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CustomColors from '../../themes/CustomColors';
import { getByLink } from '../services';

class EpisodeCard extends PureComponent {
    state = {
        characterString: "",
        isOpen: false
    }

    characters = []

    episode = this.props.episode.item

    updateCharacterData = async () => {
        for (characterId in (this.episode.characters)) {
            const character = await getByLink(this.episode.characters[characterId])
            this.characters.push(character.name)
        }
    };

    componentDidMount() {
        this.updateCharacterData().then(() =>
            this.getCharactersByString()
        )

    };

    getCharactersByString = () => {
        newCharacters = ""
        this.characters.forEach(element => {
            newCharacters = newCharacters + `${element} | `
        })
        this.setState((state, props) => {
            return {
                characterString: newCharacters
            };
        });
    }

    changeIsOpen = () => {
        this.setState((state, props) => {
            return {
                isOpen: !state.isOpen
            };
        });
    }

    render() {
        return (
            <TouchableOpacity 
            style={styles.container}
            onPress={this.changeIsOpen}>
                <View style={{flexDirection:'row', flexWrap: 'wrap'}}>
                    <Text style={styles.episodeTitleText}>
                        {this.episode.name}
                    </Text>
                    <Text style={styles.episodeTitleText}>
                    ({this.episode.episode})
                    </Text>
                    <Text style={styles.episodeTitleText}>
                    ({this.episode.air_date})
                    </Text>
                </View>

                {this.state.isOpen && <View>
                    <Text style={{
                        color: 'white',
                        fontWeight: '500',
                        fontSize: 17,
                        marginLeft: 10,
                        marginRight: 10,
                        marginTop: 8,
                        marginBottom: 3
                    }}>
                        Characters in this episodes:
                    </Text>
                    <Text style={styles.characters}>
                        {this.state.characterString}
                    </Text>
                </View>}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 5,
        backgroundColor: CustomColors.cardWhite,
        padding: 5,
        borderRadius: 10
    },
    episodeTitleText: {
        color: 'white',
        fontFamily: 'sans-serif-medium',
        fontWeight: 'bold',
        fontSize: 17,
        marginLeft: 5,
        marginRight: 5
    },
    characters: {
        color: 'white',
        marginLeft: 18,
        marginRight: 6
    }
})

export default EpisodeCard;