"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var camera_kit_1 = require("@snap/camera-kit");
var liveRenderTarget = document.getElementById('canvas');
var flipButton = document.getElementById('flip-button');
var recordButton = document.getElementById('record-button');
var progressRing = document.getElementById('progress-ring');
var progressPath = document.getElementById('progress-path');
var previewModal = document.getElementById('preview-modal');
var previewVideo = document.getElementById('preview-video');
var shareButton = document.getElementById('share-button');
var saveButton = document.getElementById('save-button');
var closeModalButton = document.getElementById('close-modal-button');
var isBackFacing = true;
var mediaStream;
var isFlipping = false;
var currentRotation = 0; // Track the current rotation
var session;
var mediaRecorder = null;
var downloadUrl = null;
var recordingStartTime = null;
var RECORD_DURATION = 60;
function init() {
    return __awaiter(this, void 0, void 0, function () {
        var cameraKit, devicePixelRatio, desiredAspectRatio, canvasWidth, canvasHeight, source, lens;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, camera_kit_1.bootstrapCameraKit)({
                        apiToken: 'YOUR_API_TOKEN'
                    })];
                case 1:
                    cameraKit = _a.sent();
                    devicePixelRatio = window.devicePixelRatio || 1;
                    desiredAspectRatio = 9 / 16;
                    if (window.innerWidth / window.innerHeight > desiredAspectRatio) {
                        // If the screen is wider than the desired aspect ratio, set height to match screen
                        canvasWidth = window.innerWidth;
                        canvasHeight = window.innerWidth / desiredAspectRatio;
                    }
                    else {
                        //If the screen is taller than the desired aspect ratio, set width to match screen
                        canvasHeight = window.innerHeight;
                        canvasWidth = window.innerHeight * desiredAspectRatio;
                    }
                    liveRenderTarget.width = canvasWidth * devicePixelRatio;
                    liveRenderTarget.height = canvasHeight * devicePixelRatio;
                    liveRenderTarget.style.width = "".concat(canvasWidth, "px");
                    liveRenderTarget.style.height = "".concat(canvasHeight, "px");
                    liveRenderTarget.style.position = 'fixed';
                    liveRenderTarget.style.left = '50%';
                    liveRenderTarget.style.top = '50%';
                    liveRenderTarget.style.transform = 'translate(-50%, -50%)';
                    return [4 /*yield*/, cameraKit.createSession({ liveRenderTarget: liveRenderTarget })];
                case 2:
                    session = _a.sent();
                    return [4 /*yield*/, navigator.mediaDevices.getUserMedia({
                            video: {
                                facingMode: isBackFacing ? 'environment' : 'user',
                                width: { ideal: 1920 },
                                height: { ideal: 1080 }
                            },
                        })];
                case 3:
                    mediaStream = _a.sent();
                    source = (0, camera_kit_1.createMediaStreamSource)(mediaStream);
                    return [4 /*yield*/, session.setSource(source)];
                case 4:
                    _a.sent();
                    if (!isBackFacing) {
                        source.setTransform(camera_kit_1.Transform2D.MirrorX);
                    }
                    return [4 /*yield*/, session.play()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, cameraKit.lensRepository.loadLens("fb6410ff-f10b-438a-a8b0-70cc6012b2b6", "11cbcba2-1275-47ec-9916-feaa6c52d24b")];
                case 6:
                    lens = _a.sent();
                    return [4 /*yield*/, session.applyLens(lens)];
                case 7:
                    _a.sent();
                    bindFlipCamera(session);
                    bindRecorder();
                    bindModal();
                    return [2 /*return*/];
            }
        });
    });
}
function bindFlipCamera(session) {
    flipButton.style.cursor = 'pointer';
    flipButton.addEventListener('click', function () {
        if (!isFlipping) {
            flipButton.classList.add('animate-flip');
            updateCamera(session);
        }
    });
    updateCamera(session);
}
function updateCamera(session) {
    return __awaiter(this, void 0, void 0, function () {
        var source;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    isFlipping = true;
                    flipButton.disabled = true;
                    isBackFacing = !isBackFacing;
                    if (mediaStream) {
                        session.pause();
                        mediaStream.getVideoTracks()[0].stop();
                    }
                    return [4 /*yield*/, navigator.mediaDevices.getUserMedia({
                            video: {
                                facingMode: isBackFacing ? 'environment' : 'user',
                                width: { ideal: 1920 },
                                height: { ideal: 1080 }
                            },
                        })];
                case 1:
                    mediaStream = _a.sent();
                    source = (0, camera_kit_1.createMediaStreamSource)(mediaStream);
                    return [4 /*yield*/, session.setSource(source)];
                case 2:
                    _a.sent();
                    if (!isBackFacing) {
                        source.setTransform(camera_kit_1.Transform2D.MirrorX);
                    }
                    session.play();
                    currentRotation += 180; // Update current rotation
                    flipButton.style.setProperty('--current-rotation', "".concat(currentRotation, "deg"));
                    setTimeout(function () {
                        isFlipping = false;
                        flipButton.disabled = false;
                        flipButton.classList.remove('animate-flip');
                    }, 500);
                    return [2 /*return*/];
            }
        });
    });
}
function bindRecorder() {
    recordButton.addEventListener('click', function () {
        if ((mediaRecorder === null || mediaRecorder === void 0 ? void 0 : mediaRecorder.state) === 'recording') {
            stopRecording();
        }
        else {
            startRecording();
        }
    });
}
function startRecording() {
    return __awaiter(this, void 0, void 0, function () {
        var mediaStream, mimeType, chunks;
        return __generator(this, function (_a) {
            recordButton.classList.add('recording');
            progressRing.style.display = 'block';
            mediaStream = liveRenderTarget.captureStream(30);
            mimeType = 'video/webm';
            if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) {
                mimeType = 'video/webm;codecs=vp9';
            }
            else if (!MediaRecorder.isTypeSupported('video/webm')) {
                console.warn('video/webm is not supported. Recording may fail.');
                alert('This Browser does not support the Recording Functionality. ');
                return [2 /*return*/];
            }
            mediaRecorder = new MediaRecorder(mediaStream, { mimeType: mimeType });
            chunks = [];
            mediaRecorder.addEventListener('dataavailable', function (event) {
                if (event.data.size > 0) {
                    chunks.push(event.data);
                }
            });
            mediaRecorder.addEventListener('stop', function () {
                var blob = new Blob(chunks, { type: mimeType });
                downloadUrl = window.URL.createObjectURL(blob);
                previewVideo.src = downloadUrl;
                previewModal.style.display = 'flex';
                previewModal.classList.add('show');
                recordButton.classList.remove('recording');
                progressRing.style.display = 'none';
            });
            mediaRecorder.start();
            recordingStartTime = Date.now();
            updateProgress();
            return [2 /*return*/];
        });
    });
}
function updateProgress() {
    if (!mediaRecorder || mediaRecorder.state !== 'recording' || !recordingStartTime) {
        return;
    }
    var elapsedTime = Date.now() - recordingStartTime;
    var progressPercentage = Math.min(100, (elapsedTime / 1000 / RECORD_DURATION) * 100);
    var circumference = 2 * Math.PI * 30;
    var dashOffset = circumference * (1 - progressPercentage / 100);
    if (progressPath instanceof SVGPathElement) {
        progressPath.style.strokeDashoffset = String(dashOffset);
    }
    if (elapsedTime / 1000 >= RECORD_DURATION) {
        stopRecording();
    }
    else {
        requestAnimationFrame(updateProgress);
    }
}
function stopRecording() {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
    }
    recordingStartTime = null;
    if (progressPath instanceof SVGPathElement) {
        progressPath.style.strokeDashoffset = String(188);
    }
    recordButton.classList.remove('recording');
    progressRing.style.display = 'none';
}
function bindModal() {
    var _this = this;
    closeModalButton.addEventListener('click', function () {
        previewModal.style.display = 'none';
        previewModal.classList.remove('show');
        previewVideo.pause();
        previewVideo.currentTime = 0;
    });
    shareButton.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
        var response, blob, videoBlob, videoFile, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!downloadUrl) return [3 /*break*/, 8];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, fetch(downloadUrl)];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Failed to fetch video: ".concat(response.status, " ").concat(response.statusText));
                    }
                    return [4 /*yield*/, response.blob()];
                case 3:
                    blob = _a.sent();
                    videoBlob = new Blob([blob], { type: 'video/mp4' });
                    videoFile = new File([videoBlob], 'video.mp4', { type: 'video/mp4' });
                    if (!(navigator.canShare && navigator.canShare({ files: [videoFile] }))) return [3 /*break*/, 5];
                    return [4 /*yield*/, navigator.share({
                            files: [videoFile],
                            title: 'Camera Kit Recording', // Optional: Add a title
                        })];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    console.error('Sharing not supported or file is incompatible.');
                    alert('Sharing not supported in this browser or the file type is incompatible.');
                    _a.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    error_1 = _a.sent();
                    console.error('Error sharing video:', error_1);
                    alert("Error sharing video: ".concat(error_1));
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    }); });
    saveButton.addEventListener('click', function () {
        if (downloadUrl) {
            var link = document.createElement('a');
            link.setAttribute('style', 'display: none');
            link.href = downloadUrl;
            link.download = 'camera-kit-web-recording.webm';
            link.click();
            link.remove();
        }
    });
}
init();
