import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import {SearchBar} from '../components/SearchBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import {apiUrl} from '../urlconfig';
import {postRequest} from '../utils/ajax';

export class BookListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showBooks: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    console.log('BookList');
    const url = apiUrl + '/getBooks';
    const callback = (data) => {
      this.setState({books: data});
      this.setState({showBooks: data});
    };
    postRequest(url, null, callback);
  }

  getText(data) {
    let arr = [];
    let list = this.state.books;
    for (let i = 0; i < list.length; i++) {
      if (
        list[i].title.indexOf(data) >= 0 ||
        list[i].type.indexOf(data) >= 0 ||
        list[i].author.indexOf(data) >= 0 ||
        list[i].description.indexOf(data) >= 0
      ) {
        arr.push(list[i]);
      }
    }
    this.setState({
      showBooks: arr,
    });
  }

  navigateToDetail({item}) {
    console.log(item);
    this.props.navigation.push('Detail', {detail: item});
  }

  renderBook = ({item}) => {
    return (
      <TouchableHighlight
        onPress={() => {
          this.navigateToDetail({item});
        }}>
        <View style={styles.container}>
          <Image source={{uri: item.image}} style={styles.image} />
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.author}>{item.author}</Text>
          </View>
          <View>
            <Text>¥{item.price}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  cancel() {
    this.setState({
      showBooks: this.state.books,
    });
  }

  render() {
    return (
      <SafeAreaView style={{flex: 2}}>
        <SearchBar
          searchBooks={(data) => this.getText(data)}
          cancelSearching={() => this.cancel()}
        />
        <FlatList
          data={this.state.showBooks}
          renderItem={this.renderBook}
          style={styles.list}
          keyExtractor={(item) => item.bookId}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
  author: {
    fontSize: 10,
    textAlign: 'center',
  },
  rightContainer: {
    flex: 1,
    paddingRight: 10,
  },
  image: {
    width: 53,
    height: 81,
  },
  list: {
    paddingLeft: 10,
    paddingRight: 5,
    backgroundColor: '#F5FCFF',
  },
});
