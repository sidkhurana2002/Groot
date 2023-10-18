const Challenge = require("../models/Challenge");
const User = require("../models/User");
const Trip = require("../models/Trip");
const distanceController = require("./distanceController");
const geolib = require("geolib");

const addChallenge = async (req, res) => {
  try {
    const { title, description, challenge_points, challenge_distance } =
      req.body;

    const newChallenge = new Challenge({
      title,
      description,
      challenge_points,
      challenge_distance,
      users: [],
    });

    await newChallenge.save();

    res.status(201).json({
      message: "Challenge added successfully",
      challenge: newChallenge,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find();
    res.status(200).json({ challenges });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addTrip = async (req, res) => {
  try {
    const { userId, start, end, challengeId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Calculate the distance using the Haversine formula
    const distance = geolib.getDistance(
      { latitude: start.latitude, longitude: start.longitude },
      { latitude: end.latitude, longitude: end.longitude }
    );

    // Convert distance to kilometers
    const distanceInKm = distance / 1000;

    const currentDate = new Date();
    const newTrip = new Trip({
      userId,
      date: currentDate,
      startLatitude: start.latitude,
      startLongitude: start.longitude,
      endLatitude: end.latitude,
      endLongitude: end.longitude,
      distance: distanceInKm,
    });

    if (challengeId) {
      const challenge = await Challenge.findById(challengeId);

      if (!challenge) {
        return res.status(404).json({ message: "Challenge not found" });
      }

      const isChallengeCompleted = user.challenges.some(
        (ch) => ch.challengeId.toString() === challengeId
      );

      if (
        !isChallengeCompleted &&
        distanceInKm >= challenge.challenge_distance
      ) {
        const challengePoints = challenge.challenge_points;
        user.profile.progress.totalPoints += challengePoints;
        user.rewards.points += challengePoints;

        const totalPoints = user.profile.progress.totalPoints;
        if (totalPoints >= 0 && totalPoints <= 1000) {
          user.profile.progress.experience = "Seed Sower";
        } else if (totalPoints <= 3000) {
          user.profile.progress.experience = "Recycle Rookie";
        } else if (totalPoints <= 6000) {
          user.profile.progress.experience = "Ocean Guardian";
        } else if (totalPoints <= 10000) {
          user.profile.progress.experience = "Sustainable Sorcerer";
        } else {
          user.profile.progress.experience = "Eco Champion";
        }

        user.challenges.push({ challengeId });
        await user.save();

        challenge.users.push({
          userId: user._id,
          completed: true,
          completionDate: new Date(),
        });
        await challenge.save();

        newTrip.challengeId = challengeId;
      }
    }

    await newTrip.save();

    user.trips.push({ tripId: newTrip._id });
    await user.save();

    res.status(201).json({
      message: "Trip added successfully",
      trip: newTrip,
      distance: distanceInKm,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addChallenge,
  getChallenges,
  addTrip,
};
