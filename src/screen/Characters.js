import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Background from '../component/Background';
import CharacterCard from '../component/CharacterCard';
import CharacterModal from '../component/CharacterModal';
import { getCharacters, getByLink } from '../services';

class Characters extends React.PureComponent {
  state = {
    nextPage: "",
    characterData: [],
    characterModal: {},
    characterModalBackgroundColor: "transparent"
  }

  changeCharacterModal = async (characterInfo, characterModalBackground) => {
    this.setState((state, props) => {
      return {
        characterModal: characterInfo,
        characterModalBackgroundColor: characterModalBackground
      };
    })
  }

  addMoreCharacters = async () => {
    if (this.state.nextPage) {
      const characters = await getByLink(this.state.nextPage)

      if (characters.info.next != this.state.nextPage) {
        this.setState((state, props) => {
          return {
            characterData: state.characterData.concat(characters.results),
            nextPage: characters.info.next
          };
        })
      }

    }
  };

  updateCharacterData = async () => {
    const characters = await getCharacters()

    this.setState((state, props) => {
      return {
        characterData: characters.results,
        nextPage: characters.info.next
      };
    });
  };

  componentDidMount() {
    this.updateCharacterData();
  }

  render() {
    return (
      <Background>
        <View style={styles.background}>
          {this.state.characterData && this.state.characterData[0] &&
            <FlatList
              style={styles.background}
              onEndReached={this.addMoreCharacters}
              data={this.state.characterData}
              numColumns={2}
              keyExtractor={(characterData) =>
                characterData.id - 1
              }
              renderItem={(characterData) => {
                return <CharacterCard
                  character={characterData}
                  callbackModal={this.changeCharacterModal} />
              }}
            />}
        </View>
        {this.state.characterModal.name &&
          <CharacterModal
            character={this.state.characterModal}
            callbackModal={this.changeCharacterModal}
            backgroundColor = {this.state.characterModalBackgroundColor}
          />}
      </Background>
    );
  }
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  nextButton: {
    position: 'absolute',
    backgroundColor: 'red',
    color: 'red'
  }
});

export default Characters;