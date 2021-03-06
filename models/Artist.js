const mongoose = require('mongoose');
const Album = require('./Album').schema;
const ArtistSchema = mongoose.Schema({
  spID: String,
  name: String,
  albums: [Album],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  isTracked: { type: Boolean, default: true },
  img: Array,
  isArchived: { type: Boolean, default: false },
  settingsSnapshot: { type: Array, default: null }
});
ArtistSchema.index({ spID: 1, user: 1 }, { unique: true });
module.exports = mongoose.model('artist', ArtistSchema);
