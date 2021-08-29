import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Background from '../component/Background';
import { getByLink, getEpisodes } from '../services';
import EpisodeCard from '../component/EpisodeCard';

class Episodes extends React.PureComponent {
    state = {
        episodes: [],
        nextPage: ""
    }

    componentDidMount() {
        this.updateEpisodeData();
    }

    addMoreEpisodes = async () => {
        if (this.state.nextPage && (this.state.nextPage != "null")) {
            const newEpisodes = await getByLink(this.state.nextPage)

            if (newEpisodes.info.next != this.state.nextPage) {
                this.setState((state, props) => {
                    return {
                        nextPage: newEpisodes.info.next,
                        episodes: state.episodes.concat(newEpisodes.results)
                    };
                })
            }
        }
    };

    updateEpisodeData = async () => {
        const episodes = await getEpisodes()

        this.setState((state, props) => {
            return {
                episodes: episodes.results,
                nextPage: episodes.info.next
            };
        });
    };

    render() {
        return (
            <Background>
                <View style={styles.container}>
                    <FlatList
                        style={styles.container}
                        data={this.state.episodes}
                        onEndReached={this.addMoreEpisodes}
                        keyExtractor={(episodeData) =>
                            episodeData.id - 1
                        }
                        renderItem={(episodeData) => {
                            return <EpisodeCard episode={episodeData} />
                        }}
                    />
                </View>
            </Background>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
 
export default Episodes;