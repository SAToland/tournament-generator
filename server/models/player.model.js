import {model, Schema} from 'mongoose';

const PlayerSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "name is required"],
            minlength: [3, 'Name must be more than 2 characters long.'],
            maxlength: [30, 'Name can be no more than 30 characters long.']
        },
        score: {
            type: Number,
            default: 0
        }
    },
    {timestamps: true}
);
const Player = model("Player", PlayerSchema);
export default Player;