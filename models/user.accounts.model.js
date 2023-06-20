const mongoose = require('mongoose');

const accountsSchema = new mongoose.Schema({
  id: Number,
  user_id: Number,
  list_profile_id: Number,
  storage_profile_id: Number,
  mac_address: String,
  last_request_time: String,
  RotationGames: Number,
  ReachRotationGames: Number,
  TimeoutValue: Number,
  MaxLevel: Number,
  MinBlueEssence: Number,
  EloRank: Number,
  ReachEloRank: Number,
  ListName: String,
  Status: String,
  Priority: Number,
  PlayType: String,
  FlashKey: String,
  Games: Number,
  PlayingCountry: String,
  Username: String,
  Password: String,
  Region: String,
  SummonerName: String,
  CapsuleAccount: Number,
  Level: Number,
  BlueEssence: Number,
  RiotPoints: Number,
  OrangeEssence: Number,
  CreationDate: String,
  BirthDate: String,
  CreationIP: String,
  FirstGameDate: String,
  LastGameDate: String,
  CreationEmail: String,
  SkinShards: String,
  Gemstone: String,
  Chest: Number,
  Key: Number,
  ClaimedMissions: [String],
  MetaData: String,
});

const Accounts = mongoose.model('accounts', accountsSchema);

module.exports = {
  Accounts: Accounts,
  accountsSchema: accountsSchema
};