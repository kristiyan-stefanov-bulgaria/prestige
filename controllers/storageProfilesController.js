const { StorageProfiles, User } = require('../models');

const addStorageProfile = async (storageProfile, userID) => {
  const storageProfileDoc = new StorageProfiles(storageProfile);

  try {
    await storageProfileDoc.save();
    await User.findOneAndUpdate({ _id: userID }, { $push: { storageProfiles: storageProfileDoc._id } });

    return { status: 200, message: 'Storage profile added successfully' };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

const deleteStorageProfile = async (storageProfileID, userID) => {
  try {
    await StorageProfiles.findOneAndDelete({ _id: storageProfileID });
    await User.findOneAndUpdate({ _id: userID }, { $pull: { storageProfiles: storageProfileID } });

    return { status: 200, message: 'Storage profile deleted successfully' };

  } catch (error) {
    return { status: 500, message: error.message };
  }
};

const getStorageProfiles = async (userID) => {
  try {
    const user = await User.findOne({ _id: userID });

    if (user.storageProfiles.length === 0) {
      return { success: false, message: 'No logic profiles found.' }
    }

    const storageProfiles = await StorageProfiles.find({ _id: { $in: user.storageProfiles } });

    if (storageProfiles.length === 0) {
      return { success: false, message: 'No logic profiles found.' }
    }

    return { success: true, storageProfiles }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const updateStorageProfile = async (storageProfile) => {
  try {
    await StorageProfiles.findOneAndUpdate({ _id: storageProfile._id }, storageProfile);

    return { status: 200, message: 'Storage profile updated successfully' };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

module.exports = {
  addStorageProfile,
  deleteStorageProfile,
  getStorageProfiles,
  updateStorageProfile
}