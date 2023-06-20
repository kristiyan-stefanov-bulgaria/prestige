const mongoose = require('mongoose');

const logicProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 25,
  },
  note: {
    type: String,
    minlength: 1,
    maxlength: 50,
  },
  ScreenshotFrequency: {
    type: String,
    minlength: 1,
    maxlength: 50,
  },
  RandomizeGameMode: {
    type: Number,
    validate: {
      validator: (value) => value === 0 || value === 1,
      message: 'RandomizeGameMode should be either 0 or 1',
    },
  },
  EnableHumanizer: {
    type: Number,
    validate: {
      validator: (value) => value === 0 || value === 1,
      message: 'EnableHumanizer should be either 0 or 1',
    },
  },
  SkipLeaverBusterAccount: {
    type: Number,
    validate: {
      validator: (value) => value === 0 || value === 1,
      message: 'SkipLeaverBusterAccount should be either 0 or 1',
    },
  },
  RegionMaintenanceChange: {
    type: Number,
    validate: {
      validator: (value) => value === 0 || value === 1,
      message: 'RegionMaintenanceChange should be either 0 or 1',
    },
  },
  RunePageName: {
    type: String,
    minlength: 1,
    maxlength: 25,
  },
  StopDrawingWindow: {
    type: Number,
    validate: {
      validator: (value) => value === 0 || value === 1,
      message: 'StopDrawingWindow should be either 0 or 1',
    },
  },
  MouseHumanMovement: {
    type: Number,
    validate: {
      validator: (value) => value === 0 || value === 1,
      message: 'MouseHumanMovement should be either 0 or 1',
    },
  },
  MouseChangePosition: {
    type: Number,
    validate: {
      validator: (value) => value === 0 || value === 1,
      message: 'MouseChangePosition should be either 0 or 1',
    },
  },
  IngameMaxFPS: {
    type: Number,
    min: 1,
    max: 244,
  },
  PixelScanDistanceX: {
    type: Number,
    min: 0,
    max: 2000,
  },
  PixelScanDistanceY: {
    type: Number,
    min: 0,
    max: 2000,
  },
  ScreenshotInterval: {
    type: Number,
    min: 0,
    max: 2000,
  },
  MapClickThreshold: {
    type: Number,
    min: 0,
    max: 20000,
  },
  HealthCheckInterval: {
    type: Number,
    min: 0,
    max: 5000,
  },
  PositionCheckInterval: {
    type: Number,
    min: 0,
    max: 5000,
  },
  ScreenshotRowScanTimeout: {
    type: Number,
    min: 0,
    max: 100,
  },
  ScreenshotFullScanTimeout: {
    type: Number,
    min: 0,
    max: 1000,
  },
  KiteBackTimeout: {
    type: Number,
    min: 0,
    max: 1000,
  },
  EnemyAttackTimeout: {
    type: Number,
    min: 0,
    max: 5000,
  },
  MapClickTimeout: {
    type: Number,
    min: 0,
    max: 5000,
  },
  EnemyFightDuration: {
    type: Number,
    min: 0,
    max: 10000,
  },
  HealthMinValueMin0: {
    type: Number,
    min: 0,
    max: 100,
  },
  HealthMinValueMin5: {
    type: Number,
    min: 0,
    max: 100,
  },
  HealthMinValueMin10: {
    type: Number,
    min: 0,
    max: 100,
  },
  HealthMinValueMin15: {
    type: Number,
    min: 0,
    max: 100,
  },
  HealthMinValueMin20: {
    type: Number,
    min: 0,
    max: 100,
  },
  HealthMinValueMin25: {
    type: Number,
    min: 0,
    max: 100,
  },
});

const LogicProfile = mongoose.model('LogicProfile', logicProfileSchema);

module.exports = LogicProfile;