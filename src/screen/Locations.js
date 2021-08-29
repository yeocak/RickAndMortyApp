import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import LocationCard from '../component/LocationCard';
import { getLocations } from '../services';
import Background from '../component/Background';
import { getByLink } from '../services';

class Locations extends React.PureComponent {
    state = {
        locations: [],
        nextPage: ""
    }

    componentDidMount() {
        this.updateLocationData();
    }

    addMoreLocations = async () => {
        if (this.state.nextPage && (this.state.nextPage != "null")) {
            const newLocations = await getByLink(this.state.nextPage)

            if (newLocations.info.next != this.state.nextPage) {
                this.setState((state, props) => {
                    return {
                        nextPage: newLocations.info.next,
                        locations: state.locations.concat(newLocations.results)
                    };
                })
            }
        }
    };

    updateLocationData = async () => {
        const locations = await getLocations()

        this.setState((state, props) => {
            return {
                locations: locations.results,
                nextPage: locations.info.next
            };
        });
    };

    render() {
        return (
            <Background>
                <View style={styles.container}>
                    <FlatList
                        style={styles.container}
                        data={this.state.locations}
                        onEndReached={this.addMoreLocations}
                        keyExtractor={(locationData) =>
                            locationData.id - 1
                        }
                        renderItem={(locationData) => {
                            return <LocationCard location={locationData} />
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

export default Locations;