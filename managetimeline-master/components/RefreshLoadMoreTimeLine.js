/*React Native TimeLine ListView / Flatlist*/
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import Timeline from 'react-native-timeline-flatlist';

export default class RefreshLoadMoreTimeLine extends Component {
  constructor() {
    super();
    this.onEndReached = this.onEndReached.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onRefresh = this.onRefresh.bind(this);

    this.data = [
      {
        time: '09:00',
        title: 'Event 1',
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.',
      },
      {
        time: '10:45',
        title: 'Event 2',
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      },
      { time: '12:00', title: 'Lunch', icon: require('../img/place_holder.png') },
      {
        time: '14:00',
        title: 'Event 3',
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.',
      },
      {
        time: '16:30',
        title: 'Event 4',
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      },
    ];

    this.state = {
      isRefreshing: false,
      waiting: false,
      data: this.data,
    };
  }

  onRefresh() {
    this.setState({ isRefreshing: true });
    //refresh to initial data
    setTimeout(() => {
      //refresh to initial data
      this.setState({
        data: this.data,
        isRefreshing: false,
      });
    }, 2000);
  }

  onEndReached() {
    if (!this.state.waiting) {
      this.setState({ waiting: true });

      //fetch and concat data
      setTimeout(() => {
        //refresh to initial data
        var data = this.state.data.concat([
          {
            time: '18:00',
            title: 'More Loaded Event 5',
            description:
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          },
          {
            time: '18:00',
            title: 'More Loaded Event 6',
            description:
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum.',
          },
          {
            time: '18:00',
            title: 'More Loaded Event 7',
            description:
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.',
          },
          {
            time: '18:00',
            title: 'More Loaded Event 8',
            description:
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          },
          {
            time: '18:00',
            title: 'More Loaded Event 9',
            description:
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          },
        ]);

        this.setState({
          waiting: false,
          data: data,
        });
      }, 2000);
    }
  }

  renderFooter() {
    if (this.state.waiting) {
      return <ActivityIndicator />;
    } else {
      return <Text>~</Text>;
    }
  }

  render() {
    //'rgb(45,156,219)'
    return (
      <View style={styles.container}>
        <Text
          style={{
            padding: 16,
            fontSize: 20,
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
          Refresh Load More Example
        </Text>
        <Timeline
          style={styles.list}
          data={this.state.data}
          circleSize={20}
          circleColor="rgb(45,156,219)"
          lineColor="rgb(45,156,219)"
          timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
          timeStyle={{
            textAlign: 'center',
            backgroundColor: '#ff9797',
            color: 'white',
            padding: 5,
            borderRadius: 13,
          }}
          descriptionStyle={{ color: 'gray' }}
          options={{
            style: { paddingTop: 5 },
            refreshControl: (
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this.onRefresh}
              />
            ),
            renderFooter: this.renderFooter,
            onEndReached: this.onEndReached,
          }}
          innerCircle={'dot'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
});