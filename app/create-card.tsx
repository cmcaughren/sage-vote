// app/create-card.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export default function CreateCardScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    transport_type: 'any',
    election_type: 'federal',
    url: '',
    description: '',
    opt_actions: {}
  });
  
  const [actionType, setActionType] = useState('simple'); // 'simple' or 'dice'
  const [tempAction, setTempAction] = useState({
    dice: '1',
    action: '1',
    text: ''
  });
  
  // Function to add an action to the card
  const addAction = () => {
    if (!tempAction.text) {
      Alert.alert('Error', 'Please enter action text');
      return;
    }
    
    // Create a copy of current opt_actions
    const updatedActions = {...formData.opt_actions};
    
    if (actionType === 'simple') {
      // Simple action with no dice roll
      updatedActions['1'] = [tempAction.action, tempAction.text];
    } else {
      // Dice-based action
      updatedActions[tempAction.dice] = [tempAction.action, tempAction.text];
    }
    
    // Update form data
    setFormData({
      ...formData,
      opt_actions: updatedActions
    });
    
    // Reset temp action
    setTempAction({
      dice: '1',
      action: '1',
      text: ''
    });
    
    Alert.alert('Success', 'Action added to card');
  };
  
  // Function to save the card to Firebase
  const saveCard = async () => {
    // Validate form data
    if (!formData.description) {
      Alert.alert('Error', 'Please enter a card description');
      return;
    }
    
    if (Object.keys(formData.opt_actions).length === 0) {
      Alert.alert('Error', 'Please add at least one action');
      return;
    }
    
    try {
      // Add to Firestore
      const docRef = await addDoc(collection(db, 'cards'), formData);
      Alert.alert(
        'Success', 
        `Card saved with ID: ${docRef.id}`,
        [
          { text: 'Create Another', style: 'default' },
          { 
            text: 'Go Back', 
            onPress: () => router.back(),
            style: 'cancel'
          }
        ]
      );
      
      // Reset form for a new card
      setFormData({
        transport_type: 'any',
        election_type: 'federal',
        url: '',
        description: '',
        opt_actions: {}
      });
    } catch (error) {
      Alert.alert('Error', `Failed to save card: ${error.message}`);
    }
  };
  
  // Function to export all cards as JSON
  const exportAsJson = () => {
    const jsonData = JSON.stringify(formData, null, 2);
    Alert.alert('Card JSON', jsonData);
    // In a real app, you might copy to clipboard or save to a file
  };
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Create New Card</Text>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Transport Type:</Text>
        <Text style={styles.helperText}>
          Choose which transportation mode this card applies to: "any", "bus", "carpool", or "bicycle". 
          "any" means it can appear for any mode.
        </Text>
        <View style={styles.transportButtons}>
          {['any', 'bus', 'carpool', 'bicycle'].map(type => (
            <TouchableOpacity
              key={type}
              style={[
                styles.transportButton,
                formData.transport_type === type && styles.activeTransportButton
              ]}
              onPress={() => setFormData({...formData, transport_type: type})}
            >
              <Text style={formData.transport_type === type ? styles.activeButtonText : styles.buttonText}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Description:</Text>
        <Text style={styles.helperText}>
          Enter the political scenario the player encounters. This is the main text shown on the card.
        </Text>
        <TextInput
          style={styles.textArea}
          multiline
          numberOfLines={4}
          value={formData.description}
          onChangeText={(text) => 
            setFormData({...formData, description: text})
          }
          placeholder="Enter the scenario description"
        />
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Educational URL:</Text>
        <Text style={styles.helperText}>
          Link to educational content about Canadian politics related to this scenario.
          This will be shown as a "Learn More" link on the card.
        </Text>
        <TextInput
          style={styles.input}
          value={formData.url}
          onChangeText={(text) => 
            setFormData({...formData, url: text})
          }
          placeholder="https://example.com"
          keyboardType="url"
        />
      </View>
      
      <View style={styles.divider} />
      
      <Text style={styles.subtitle}>Add Actions</Text>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Action Type:</Text>
        <Text style={styles.helperText}>
          Simple: One action without dice roll. Dice Roll: Different actions based on dice values.
        </Text>
        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.actionTypeButton,
              actionType === 'simple' && styles.activeButton
            ]}
            onPress={() => setActionType('simple')}
          >
            <Text style={actionType === 'simple' ? styles.activeButtonText : styles.buttonText}>
              Simple
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.actionTypeButton,
              actionType === 'dice' && styles.activeButton
            ]}
            onPress={() => setActionType('dice')}
          >
            <Text style={actionType === 'dice' ? styles.activeButtonText : styles.buttonText}>
              Dice Roll
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {actionType === 'dice' && (
        <View style={styles.formGroup}>
          <Text style={styles.label}>Dice Values (comma-separated):</Text>
          <Text style={styles.helperText}>
            Enter dice values that trigger this action (e.g., "1,2,3" or "4,5,6").
          </Text>
          <TextInput
            style={styles.input}
            value={tempAction.dice}
            onChangeText={(text) => 
              setTempAction({...tempAction, dice: text})
            }
            placeholder="1,2,3"
          />
        </View>
      )}
<View style={styles.formGroup}>
  <Text style={styles.label}>Action Effect:</Text>
  <Text style={styles.helperText}>
    What happens when this action is triggered.
  </Text>
  
  <View style={styles.actionButtonsContainer}>
    {[
      { label: "Nothing", value: "nothing" },
      { label: "Return to Crossroads", value: "crossroads" },
      { label: "Move Forward 1", value: "1" },
      { label: "Move Forward 2", value: "2" },
      { label: "Move Forward 3", value: "3" },
      { label: "Move Back 1", value: "-1" },
      { label: "Move Back 2", value: "-2" },
      { label: "Move Back 3", value: "-3" }
    ].map(item => (
      <TouchableOpacity
        key={item.value}
        style={[
          styles.actionEffectButton,
          tempAction.action === item.value && styles.activeActionEffectButton
        ]}
        onPress={() => setTempAction({...tempAction, action: item.value})}
      >
        <Text style={tempAction.action === item.value ? styles.activeButtonText : styles.buttonText}>
          {item.label}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
</View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Action Text:</Text>
        <Text style={styles.helperText}>
          Text explaining what happens and why (e.g., "You explain electoral reform. Move forward 2 spaces.").
        </Text>
        <TextInput
          style={styles.textArea}
          multiline
          numberOfLines={3}
          value={tempAction.text}
          onChangeText={(text) => 
            setTempAction({...tempAction, text: text})
          }
          placeholder="Text to display for this action"
        />
      </View>
      
      <TouchableOpacity 
        style={styles.addButton}
        onPress={addAction}
      >
        <Text style={styles.buttonText}>Add Action</Text>
      </TouchableOpacity>
      
      <View style={styles.divider} />
      
      {Object.keys(formData.opt_actions).length > 0 && (
        <View style={styles.actionsContainer}>
          <Text style={styles.subtitle}>Current Actions:</Text>
          {Object.entries(formData.opt_actions).map(([dice, [action, text]], index) => (
            <View key={index} style={styles.actionItem}>
              <Text style={styles.actionTitle}>
                {dice === '1' && Object.keys(formData.opt_actions).length === 1 
                  ? 'Simple Action' 
                  : `Dice Roll: ${dice}`}
              </Text>
              <Text style={styles.actionSubtitle}>Effect: {action}</Text>
              <Text style={styles.actionText}>{text}</Text>
            </View>
          ))}
        </View>
      )}
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.exportButton}
          onPress={exportAsJson}
        >
          <Text style={styles.buttonText}>Export as JSON</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.saveButton}
          onPress={saveCard}
        >
          <Text style={styles.buttonText}>Save Card</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => router.back()}
      >
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
      
      <View style={styles.referenceContainer}>
        <Text style={styles.referenceTitle}>Card Fields Reference</Text>
        <Text style={styles.referenceText}>
          <Text style={styles.bold}>transport_type:</Text> Which paths this card applies to (any, bus, carpool, bicycle){'\n'}
          <Text style={styles.bold}>election_type:</Text> Currently only "federal" (future: provincial, municipal){'\n'}
          <Text style={styles.bold}>url:</Text> Educational link about Canadian politics{'\n'}
          <Text style={styles.bold}>description:</Text> The political scenario description{'\n'}
          <Text style={styles.bold}>opt_actions:</Text> Possible outcomes{'\n'}
          - For simple cards: One action, no dice roll{'\n'}
          - For dice cards: Different actions based on dice values{'\n'}
          - Action codes: nothing, crossroads, 1, 2, 3, -1, -2, -3
        </Text>
      </View>
      
      <View style={styles.spacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 15,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: '500',
  },
  helperText: {
    fontSize: 12,
    color: '#6c757d',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    backgroundColor: 'white',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 4,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  transportButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  transportButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#e9ecef',
    flex: 1,
    marginHorizontal: 3,
    alignItems: 'center',
  },
  activeTransportButton: {
    backgroundColor: '#007bff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionTypeButton: {
    flex: 1,
    padding: 12,
    marginHorizontal: 5,
    borderRadius: 4,
    backgroundColor: '#e9ecef',
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#007bff',
  },
  buttonText: {
    color: '#212529',
    fontWeight: '500',
  },
  activeButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#dee2e6',
    marginVertical: 20,
  },
  actionsContainer: {
    marginBottom: 20,
  },
  actionItem: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 4,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#007bff',
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  actionSubtitle: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 5,
  },
  actionText: {
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
    flex: 1,
    marginLeft: 8,
  },
  exportButton: {
    backgroundColor: '#6c757d',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 20,
  },
  referenceContainer: {
    backgroundColor: '#f1f8ff',
    padding: 15,
    borderRadius: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#0366d6',
    marginTop: 20,
    marginBottom: 20,
  },
  referenceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  referenceText: {
    fontSize: 14,
    lineHeight: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
  spacer: {
    height: 40,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  actionEffectButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#e9ecef',
    margin: 4,
    alignItems: 'center',
    width: '47%', // This will create a 2-column layout
  },
  activeActionEffectButton: {
    backgroundColor: '#007bff',
  },
});