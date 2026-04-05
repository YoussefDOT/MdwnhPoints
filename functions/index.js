const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Initialize the Firebase Admin SDK
admin.initializeApp();

// This function triggers whenever a new point history record is added
exports.notifyLeaderOnPointsAdded = functions.database.ref('/history/{pushId}')
    .onCreate(async (snapshot, context) => {
        const historyData = snapshot.val();
        
        // Return if invalid data
        if (!historyData || !historyData.name || !historyData.pointsAdded) {
            console.log("Invalid history data, skipping.");
            return null;
        }

        const { name, pointsAdded } = historyData;

        try {
            // Read the current players list to determine who the leader is
            const playersSnap = await admin.database().ref('/players').once('value');
            const players = playersSnap.val();

            if (!players) {
                console.log("No players found.");
                return null;
            }

            let leaderName = null;
            let maxPoints = -1;
            let newTotalOfPlayer = 0;

            // Iterate over all players to find the leader (highest points)
            for (const [pName, pData] of Object.entries(players)) {
                if (pName === name) {
                    newTotalOfPlayer = pData.totalPoints;
                }
                if (pData.totalPoints > maxPoints) {
                    maxPoints = pData.totalPoints;
                    leaderName = pName;
                }
            }

            // Write a notification object to the leader's node.
            // When this node updates, the frontend listener triggers an in-app alert.
            if (leaderName) {
                const notificationMsg = `${name} just added ${pointsAdded} points! (New Total: ${newTotalOfPlayer})`;
                
                await admin.database().ref(`/notifications/${leaderName}`).set({
                    message: notificationMsg,
                    timestamp: admin.database.ServerValue.TIMESTAMP
                });
                
                console.log(`Successfully notified Leader (${leaderName}): ${notificationMsg}`);
            }

            return null;
        } catch (error) {
            console.error("Error setting notification:", error);
            return null;
        }
    });
