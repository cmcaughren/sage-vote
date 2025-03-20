import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { useGameContext } from "../../context/GameContext";
import DiceRoller from "../../components/ui/DiceRoller";

export default function GameScreen() {
    const {
        transportMode,
        setTransportMode,
        boardPosition,
        setBoardPosition,
        diceRoll,
        setDiceRoll,
    } = useGameContext();
    const [canContinue, setCanContinue] = useState(false);
    const router = useRouter();

    // Handle dice roll completion
    const handleRollComplete = (result) => {
        setDiceRoll(result);

        // Determine transport mode based on result
        if (result >= 1 && result <= 3) {
            setTransportMode("bus");
        } else if (result >= 4 && result <= 5) {
            setTransportMode("carpool");
        } else {
            setTransportMode("bicycle");
        }
        setCanContinue(true);
    };

    const handleContinue = () => {
        // Navigate to the game board screen
        router.push("/gameboard");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choose Your Path</Text>
            
            <View style={styles.instructionsContainer}>
                <Text style={styles.instruction}>1 - 3: Public Transit</Text>
                <Text style={styles.instruction}>4 - 5: Car Pool</Text>
                <Text style={styles.instruction}>6: Bicycle</Text>
            </View>
            
            <DiceRoller onRollComplete={handleRollComplete} />
            
            {transportMode && (
                <View style={styles.resultContainer}>
                    <Text style={styles.resultText}>
                        You rolled a {diceRoll}
                    </Text>
                    <Text style={styles.transportText}>
                        Your transport mode: {transportMode}
                    </Text>
                </View>
            )}
            
            <TouchableOpacity
                style={[
                    styles.continueButton,
                    !canContinue && styles.disabledButton
                ]}
                onPress={handleContinue}
                disabled={!canContinue}
            >
                <Text style={styles.continueButtonText}>
                    Continue
                </Text>
            </TouchableOpacity>
            
            <Link href="/" style={styles.backButton}>
                Back to Home
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    instructionsContainer: {
        marginBottom: 30,
        alignItems: "center",
    },
    instruction: {
        fontSize: 18,
        marginBottom: 10,
    },
    resultContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    resultText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    transportText: {
        fontSize: 18,
        marginTop: 10,
        color: "#007bff",
    },
    continueButton: {
        marginTop: 30,
        backgroundColor: "#28a745",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    disabledButton: {
        backgroundColor: '#cccccc',
        opacity: 0.5,
    },
    continueButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    backButton: {
        marginTop: 20,
        color: "blue",
        textAlign: "center",
    },
});