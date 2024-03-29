import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    class: {
        type: Number,
        required: true,
    },
    excused: {
        type: Number,
        required: true,
        default: 0,
    },
    unexcused: {
        type: Number,
        required: true,
        default: 0,
    },
    totalAbsence: {
        type: Number,
        required: true,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Student = mongoose.model("student", studentSchema);
