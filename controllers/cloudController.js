const { Cloud, User } = require('../models');

const createCloudProject = async (projectData, userID) => {
  const cloudProject = new Cloud(projectData);

  try {
    await cloudProject.save();
    await User.findOneAndUpdate({ _id: userID }, { $push: { cloud: cloudProject._id } });

    return { success: true, message: 'Cloud project created'};
  } catch (err) {
    return { success: false, message: err.message };
  }
};

const getCloudProjects = async (userID) => {
  const user = await User.findOne({ _id: userID });

  if (user.length === 0) {
    return { success: false, message: 'User not found' };
  }

  if (user.cloud.length === 0) {
    return { success: false, message: 'User has no cloud projects' };
  }

  const projects = await Cloud.find({ _id: { $in: user.cloud } });

  return { success: true, cloudProjects: projects };
};

const updateCloudProject = async (projectName, cloudProjectID) => {
  if (projectName === '' || !projectName) {
    return { success: false, message: 'Project name cannot be empty' };
  }

  if (cloudProjectID === '' ||!cloudProjectID) {
    return { success: false, message: 'Cloud project ID cannot be empty' };
  }

  try {
    await Cloud.findOneAndUpdate({ _id: cloudProjectID }, { $set: { name: projectName } });
    return { success: true, message: 'Project updated' };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

const deleteCloudProject = async (cloudProjectID, userID) => {
  if (cloudProjectID === '' ||!cloudProjectID) {
    return { success: false, message: 'Cloud project ID cannot be empty' };
  }

  if (userID === '' ||!userID) {
    return { success: false, message: 'User ID cannot be empty' };
  }

  try {
    const cloudProject = await Cloud.findOne({ _id: cloudProjectID });

    if (!cloudProject) {
      return { success: false, message: 'Cloud project not found' };
    }

    let activeDroplets = false;
    for(let droplet in cloudProject.droplets) {
      if (droplet.status !== 'expired' || droplet.status !== 'inactive') {
        activeDroplets = true;
        break;
      }
    }

    if (activeDroplets) {
      return { success: false, message: 'Cloud project has active droplets' };
    }

    const cloudDeleted = await Cloud.deleteOne({ _id: cloudProjectID });
    await User.findOneAndUpdate({ _id: userID }, { $pull: { cloud: cloudProjectID } });

    if (cloudDeleted) {
      return { success: true, message: 'Cloud project deleted' };
    }

    return { success: false, message: 'Cloud project not deleted' };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

const createCloudDroplet = async (req) => {
  const { dropletData, cloudProjectID } = req;

  if (dropletData === '' || !dropletData || Object.keys(dropletData).length === 0) {
    return { success: false, message: 'Droplet data cannot be empty' };
  }

  if (cloudProjectID === '' || !cloudProjectID) {
    return { success: false, message: 'Cloud project ID cannot be empty' };
  }

  try {
    const isCreated = await Cloud.findOneAndUpdate({ _id: cloudProjectID }, { $push: { droplets: dropletData } });

    if (isCreated) {
      return { success: true, message: 'Droplet created' };
    }

    return { success: false, message: 'Droplet not created' };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

const getCloudDroplets = async (cloudProjectID) => {
  if (cloudProjectID === '' ||!cloudProjectID) {
    return { success: false, message: 'Cloud project ID cannot be empty' }
  }

  const cloudProject = await Cloud.findOne({ _id: cloudProjectID });

  if (!cloudProject) {
    return { success: false, message: 'Cloud project not found' };
  }

  if (cloudProject.droplets.length === 0) {
    return { success: false, message: 'Cloud project has no droplets' };
  }

  return { success: true, cloudDroplets: cloudProject.droplets };
};

const deleteCloudDroplet = async (dropletID) => {
  if (dropletID === '' || !dropletID) {
    return { success: false, message: 'Droplet ID cannot be empty' };
  }

  try {
    const cloudProject = await Cloud.findOne({ 'droplets._id': dropletID });

    if (!cloudProject) {
      return { success: false, message: 'Cloud project not found' };
    }

    if (cloudProject.droplets.length === 0) {
      return { success: false, message: 'Cloud project has no droplets' };
    }

    const droplet = cloudProject.droplets.find(droplet => droplet._id)

    if (!droplet) {
      return { success: false, message: 'Droplet not found' };
    }

    if (droplet.status === 'expired' || droplet.status === 'offline') {
      cloudProject.droplets.splice(droplet.__index, 1);

      await cloudProject.save();
      return { success: true, message: 'Droplet deleted' };
    }
    return { success: false, message: 'Droplet is not expired/offline' };

  } catch (err) {
    return { success: false, message: err.message };
  }
};

const updateCloudDroplet = async (dropletID, dropletData) => {
  if (dropletID === '' || !dropletID) {
    return { success: false, message: 'Droplet ID cannot be empty' };
  }

  if (Object.keys(dropletData).length === 0) {
    return { success: false, message: 'Droplet data cannot be empty' };
  }

  try {
    const cloudProject = await Cloud.findOne({ 'droplets._id': dropletID });

    if (!cloudProject) {
      return { success: false, message: 'Cloud project not found' };
    }

    if (cloudProject.droplets.length === 0) {
      return { success: false, message: 'Cloud project has no droplets' };
    }

    const updatedDroplet = await Cloud.findOneAndUpdate(
      { 'droplets._id': dropletID },
      { $set: { 'droplets.$': dropletData } },
      { new: true }
    );

    if (!updatedDroplet) {
      return { success: false, message: 'Failed to update droplet' };
    }

    return { success: true, message: 'Droplet updated' };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

module.exports = {
  createCloudProject,
  getCloudProjects,
  updateCloudProject,
  deleteCloudProject,
  createCloudDroplet,
  getCloudDroplets,
  deleteCloudDroplet,
  updateCloudDroplet
}