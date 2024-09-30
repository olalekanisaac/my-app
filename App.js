import { StatusBar } from 'expo-status-bar';
import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import HeaderTop from './Header/HeaderTop';
import LottieView from 'lottie-react-native';

const initailBoard = Array(9).fill(null);
const { width: windowWidth } = Dimensions.get('window');
export default function App() {
  const [board, setBoard] = useState(initailBoard);
  const [isPlayerTurn, setisPlayerturn] = useState(true);
  const [winner, setwinner] = useState(null);

  const handleSquarePress = index => {
    //checking if the square is empty and no winner
    if (!board[index] && !winner) {
      // To update the board
      const newBoard = [...board]
      newBoard[index] = isPlayerTurn ? 'X' : 'O';
      setBoard(newBoard);
      setisPlayerturn(!isPlayerTurn);

    }
  };
  const handleReset = () => {
    setBoard(initailBoard);
    setisPlayerturn(true);
    setwinner(null);
  };

  useEffect(() => {
    checkWinner();
  }, [board])
  const checkWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],

    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        setwinner(board[a]);
        return;
      }
    };
    if (board.every(square => square)) {
      setwinner('draw')
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container} >

          <StatusBar style="light" />
          <HeaderTop />

          <ImageBackground
            source={require('../my-app/assets/solstice-hannan--yhBOqHOr0c-unsplash.jpg')}
            style={styles.Background}
          />

          <View style={styles.bored}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(index => (
              <TouchableOpacity style={styles.square} onPress={() => handleSquarePress(index)}
                disabled={board[index] || winner}
                key={index}
              >
                <Text style={[styles.squareText, { color: board[index] === 'X' ? 'red' : 'green' }]}>
                  {board[index] ? board[index].toString() : ''}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {winner && (
            <>
              {winner === 'draw' ? (
                <LottieView
                  source={require('../my-app/Lotti/Animation - 1727207552412.json')}
                  autoPlay
                  loop={false}
                  style={{ width: 100, height: 100 }}
                />
              ) : (
                <LottieView
                  source={require('../my-app/Lotti/Animation - 1727188509305.json')}
                  autoPlay
                  loop={false}
                  style={{ width: 200, height: 200 }}
                />
              )}
              <Text style={styles.Winnertext}>
                {winner === 'draw' ? "It's a Draw!" : `Player ${winner} winner`}
              </Text>
            </>

          )}
          <Text style={{ color: 'white' }}>
            {
              !winner ? `Player ${isPlayerTurn ? 'X' : 'O'}'s turn` : null
            }
          </Text>

          <TouchableOpacity style={styles.button} onPress={handleReset}>
            <Text style={styles.reset}>
              Reset Game
            </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: StatusBar.currentHeight,
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingHorizontal: '5%',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '10%',

  },
  bored: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    // padding: 4,
    paddingVertical: '5%', // Responsive vertical padding
    width: '100%',
  },
  square: {
    width: windowWidth * 0.25, // Responsive width (25% of screen width)
    height: windowWidth * 0.25,
    backgroundColor: 'rgba(255,255,255,0.8)',
    margin: '3%', // Responsive margin
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  Background: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.4,  // Transparency of the background image.
    flex: 1,
    position: 'absolute', // Positioning to overlay on the image
    top: 40,
    backgroundColor: 'transparent',
  },
  squareText: {
    fontSize: 36,
  },

  Winnertext: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginTop: 10,
  },
  reset: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    // marginTop:10,

  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    width: '60%',

    justifyContent: 'center',
    paddingHorizontal: 20,
  }
});
