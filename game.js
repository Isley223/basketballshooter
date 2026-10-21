        /**
         * GYM HOOPS PRO - COMPLETE INDOOR BASKETBALL GAME ENGINE
         * Canvas2D, Web Audio API procedural sound engine, Spring rim physics & AI Defender
         */

        // ==========================================
        // 1. AUDIO SYNTHESIZER MODULE (Web Audio API)
        // ==========================================
        class SoundEngine {
            constructor() {
                this.ctx = null;
                this.enabled = true;
            }

            init() {
                if (!this.ctx) {
                    const AudioContext = window.AudioContext || window.webkitAudioContext;
                    this.ctx = new AudioContext();
                }
                if (this.ctx.state === 'suspended') {
                    this.ctx.resume();
                }
            }

            playBounce() {
                if (!this.enabled || !this.ctx) return;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(150, this.ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(35, this.ctx.currentTime + 0.12);
                gain.gain.setValueAtTime(0.45, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start();
                osc.stop(this.ctx.currentTime + 0.12);
            }

            playSwish() {
                if (!this.enabled || !this.ctx) return;
                const bufferSize = this.ctx.sampleRate * 0.28;
                const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
                const data = buffer.getChannelData(0);
                for (let i = 0; i < bufferSize; i++) {
                    data[i] = Math.random() * 2 - 1;
                }
                const noise = this.ctx.createBufferSource();
                noise.buffer = buffer;

                const filter = this.ctx.createBiquadFilter();
                filter.type = 'bandpass';
                filter.frequency.setValueAtTime(1300, this.ctx.currentTime);
                filter.Q.setValueAtTime(3.5, this.ctx.currentTime);

                const gain = this.ctx.createGain();
                gain.gain.setValueAtTime(0.6, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.28);

                noise.connect(filter);
                filter.connect(gain);
                gain.connect(this.ctx.destination);
                noise.start();
            }

            playRim() {
                if (!this.enabled || !this.ctx) return;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(340, this.ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(75, this.ctx.currentTime + 0.18);
                gain.gain.setValueAtTime(0.65, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.18);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start();
                osc.stop(this.ctx.currentTime + 0.18);
            }

            playBlock() {
                if (!this.enabled || !this.ctx) return;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'square';
                osc.frequency.setValueAtTime(180, this.ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.15);
                gain.gain.setValueAtTime(0.7, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start();
                osc.stop(this.ctx.currentTime + 0.15);
            }

            playSqueak() {
                if (!this.enabled || !this.ctx) return;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(1900, this.ctx.currentTime);
                osc.frequency.linearRampToValueAtTime(2500, this.ctx.currentTime + 0.08);
                gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start();
                osc.stop(this.ctx.currentTime + 0.08);
            }

            playWhistle() {
                if (!this.enabled || !this.ctx) return;
                const osc1 = this.ctx.createOscillator();
                const osc2 = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc1.type = 'sine';
                osc2.type = 'sine';
                osc1.frequency.setValueAtTime(2600, this.ctx.currentTime);
                osc2.frequency.setValueAtTime(2850, this.ctx.currentTime);

                gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.35);

                osc1.connect(gain);
                osc2.connect(gain);
                gain.connect(this.ctx.destination);

                osc1.start();
                osc2.start();
                osc1.stop(this.ctx.currentTime + 0.35);
                osc2.stop(this.ctx.currentTime + 0.35);
            }

            playBuzzer() {
                if (!this.enabled || !this.ctx) return;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(140, this.ctx.currentTime);
                gain.gain.setValueAtTime(0.5, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.8);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start();
                osc.stop(this.ctx.currentTime + 0.8);
            }

            playCheer() {
                if (!this.enabled || !this.ctx) return;
                [420, 520, 680, 840].forEach((freq, idx) => {
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
                    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.6 + idx * 0.1);
                    osc.connect(gain);
                    gain.connect(this.ctx.destination);
                    osc.start();
                    osc.stop(this.ctx.currentTime + 0.7 + idx * 0.1);
                });
            }

            playGroan() {
                if (!this.enabled || !this.ctx) return;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(110, this.ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(65, this.ctx.currentTime + 0.4);
                gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.4);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start();
                osc.stop(this.ctx.currentTime + 0.4);
            }
        }

        const audio = new SoundEngine();

        // ==========================================
        // 2. CONSTANTS & GAME STATE
        // ==========================================
        const CANVAS_VIRTUAL_WIDTH = 1000;
        const CANVAS_VIRTUAL_HEIGHT = 560;
        const FLOOR_Y = 460;
        const GRAVITY = 0.42;

        const COURT_HOOP = {
            backboardX: 880,
            backboardYTop: 125,
            backboardYBottom: 255,
            rimFrontX: 805,
            rimBackX: 865,
            rimY: 235,
            rimRadius: 5
        };

        const THREE_POINT_X = 420;
        const FREE_THROW_X = 580;
        const PAINT_X = 670;
        const LOGO_X = 280;

        let gameState = 'IDLE'; // 'IDLE', 'PLAYING', 'GAMEOVER'
        let currentGameMode = 'blitz'; // 'blitz', 'ft', 'defender', 'practice'
        let defenderEnabled = false;
        let opponentHasPossession = false;
        let checkUpTimer = 0;
        let playerSpaceAction = null;

        let gameTimeLeft = 60;
        let shotClock = 24;
        let timerInterval = null;

        let score = 0;
        let opponentScore = 0;
        let highScore = parseInt(localStorage.getItem('gym_hoops_high_score') || '0');
        let streak = 0;
        let maxStreak = 0;
        let totalShots = 0;
        let madeShots = 0;
        let swishCount = 0;

        let redLEDFlashTimer = 0;

        const keys = { left: false, right: false, space: false };

        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');

        // ==========================================
        // 3. BLEACHERS & ANIMATED CROWD SYSTEM
        // ==========================================
        class BleacherCrowd {
            constructor() {
                this.people = [];
                this.tauntTimer = 0;
                this.tauntText = '';
                this.init();
            }

            init() {
                this.people = [];
                const tierYs = [305, 345, 385];
                const startX = 120;
                const endX = 740;
                const spacing = 32;

                tierYs.forEach((y, tierIndex) => {
                    for (let x = startX + (tierIndex * 12); x < endX; x += spacing + Math.random() * 8) {
                        this.people.push({
                            x: x,
                            y: y,
                            tier: tierIndex,
                            shirtColor: ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#64748b'][Math.floor(Math.random() * 7)],
                            skinTone: ['#f87171', '#fbbf24', '#d97706', '#78350f', '#fca5a5'][Math.floor(Math.random() * 5)],
                            hairColor: ['#0f172a', '#78350f', '#eab308', '#dc2626'][Math.floor(Math.random() * 4)],
                            armState: 'DOWN', // DOWN, UP, WAVING
                            jumpY: 0,
                            cheerTimer: 0,
                            groanTimer: 0,
                            offsetPhase: Math.random() * Math.PI * 2
                        });
                    }
                });
            }

            triggerCheer() {
                this.people.forEach(p => {
                    p.cheerTimer = 80 + Math.random() * 30;
                    p.armState = Math.random() > 0.3 ? 'UP' : 'WAVING';
                });
            }

            triggerGroan() {
                this.people.forEach(p => {
                    p.groanTimer = 60;
                    p.armState = 'DOWN';
                });
            }

            triggerMiss() {
                const taunts = ['AIR BALL!', 'BRICK!', 'BOOO!', 'TRY AGAIN!'];
                this.tauntText = taunts[Math.floor(Math.random() * taunts.length)];
                this.tauntTimer = 120;
                this.people.forEach(p => {
                    p.groanTimer = 100;
                    p.armState = 'TAUNTING';
                });
                audio.playGroan();
            }

            update() {
                if (this.tauntTimer > 0) this.tauntTimer--;
                this.people.forEach(p => {
                    if (p.cheerTimer > 0) {
                        p.cheerTimer--;
                        p.jumpY = Math.abs(Math.sin(Date.now() * 0.018 + p.offsetPhase)) * 12;
                    } else if (p.groanTimer > 0) {
                        p.groanTimer--;
                        p.jumpY = -3; // Head slump
                        if (p.armState === 'TAUNTING') {
                            p.jumpY = Math.sin(Date.now() * 0.025 + p.offsetPhase) * 2;
                        }
                    } else {
                        p.jumpY = 0;
                        p.armState = 'DOWN';
                    }
                });
            }

            draw(ctx) {
                const wood = ctx.createLinearGradient(80, 320, 760, 435);
                wood.addColorStop(0, '#854d0e');
                wood.addColorStop(0.45, '#b45309');
                wood.addColorStop(1, '#713f12');
                ctx.fillStyle = wood;
                ctx.strokeStyle = '#451a03';
                ctx.lineWidth = 3;
                const tiers = [
                    { y: 320, h: 35 },
                    { y: 360, h: 35 },
                    { y: 400, h: 35 }
                ];

                tiers.forEach(t => {
                    ctx.fillRect(80, t.y, 680, t.h);
                    ctx.strokeRect(80, t.y, 680, t.h);
                    ctx.strokeStyle = 'rgba(254, 215, 170, 0.4)';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(84, t.y + 5);
                    ctx.lineTo(756, t.y + 5);
                    ctx.moveTo(84, t.y + t.h - 5);
                    ctx.lineTo(756, t.y + t.h - 5);
                    ctx.stroke();
                    ctx.strokeStyle = '#451a03';
                    ctx.lineWidth = 3;
                });

                ctx.fillStyle = '#78350f';
                [100, 300, 500, 730].forEach(x => ctx.fillRect(x, 350, 12, 50));
                ctx.fillStyle = '#451a03';
                [100, 300, 500, 730].forEach(x => ctx.fillRect(x, 350, 3, 50));

                // Render Crowd Spectators
                this.people.forEach(p => {
                    ctx.save();
                    ctx.translate(p.x, p.y - p.jumpY);

                    // Body / Shirt
                    ctx.fillStyle = p.shirtColor;
                    ctx.fillRect(-8, -20, 16, 20);

                    // Head
                    ctx.fillStyle = p.skinTone;
                    ctx.beginPath();
                    ctx.arc(0, -27, 7, 0, Math.PI * 2);
                    ctx.fill();

                    // Hair
                    ctx.fillStyle = p.hairColor;
                    ctx.beginPath();
                    ctx.arc(0, -30, 7, Math.PI, Math.PI * 2);
                    ctx.fill();

                    // Arms / Cheering
                    ctx.strokeStyle = p.skinTone;
                    ctx.lineWidth = 3;
                    ctx.lineCap = 'round';

                    if (p.armState === 'UP') {
                        ctx.beginPath();
                        ctx.moveTo(-7, -18);
                        ctx.lineTo(-12, -34);
                        ctx.moveTo(7, -18);
                        ctx.lineTo(12, -34);
                        ctx.stroke();
                    } else if (p.armState === 'WAVING') {
                        const wave = Math.sin(Date.now() * 0.02 + p.offsetPhase) * 6;
                        ctx.beginPath();
                        ctx.moveTo(-7, -18);
                        ctx.lineTo(-12 + wave, -34);
                        ctx.moveTo(7, -18);
                        ctx.lineTo(12 - wave, -34);
                        ctx.stroke();
                    } else if (p.armState === 'TAUNTING') {
                        const wave = Math.sin(Date.now() * 0.025 + p.offsetPhase) * 5;
                        ctx.beginPath();
                        ctx.moveTo(-7, -18);
                        ctx.lineTo(-12 + wave, -31);
                        ctx.moveTo(7, -18);
                        ctx.lineTo(12 - wave, -31);
                        ctx.stroke();
                    } else {
                        // Resting arms
                        ctx.beginPath();
                        ctx.moveTo(-7, -18);
                        ctx.lineTo(-10, -8);
                        ctx.moveTo(7, -18);
                        ctx.lineTo(10, -8);
                        ctx.stroke();
                    }

                    ctx.restore();
                });

                if (this.tauntTimer > 0) {
                    ctx.save();
                    ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
                    ctx.strokeStyle = '#f97316';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.roundRect(285, 245, 250, 42, 10);
                    ctx.fill();
                    ctx.stroke();
                    ctx.fillStyle = '#fdba74';
                    ctx.font = 'bold 22px Teko, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.fillText(this.tauntText, 410, 273);
                    ctx.restore();
                }
            }
        }

        const crowd = new BleacherCrowd();

        // ==========================================
        // 4. SHOOTER & DEFENDER ENTITIES
        // ==========================================
        const player = {
            x: 580,
            y: FLOOR_Y,
            vx: 0,
            speed: 4.5,
            isFacingRight: true,
            isCharging: false,
            power: 0,
            powerDirection: 1,
            kneeBend: 0,
            jumpOffsetY: 0,
            jumpTimer: 0,
            runCycle: 0,
            jukeTimer: 0,
            jukeCooldown: 0,
            jukeDirection: 0,
            state: 'IDLE',

            reset() {
                this.x = 580;
                this.y = FLOOR_Y;
                this.vx = 0;
                this.isCharging = false;
                this.power = 0;
                this.kneeBend = 0;
                this.jumpOffsetY = 0;
                this.jumpTimer = 0;
                this.runCycle = 0;
                this.jukeTimer = 0;
                this.jukeCooldown = 0;
                this.jukeDirection = 0;
                this.state = 'IDLE';
            },

            performJuke() {
                if (gameState !== 'PLAYING' || !ball.hasBall || this.jukeCooldown > 0) return;
                this.jukeDirection = keys.left ? -1 : keys.right ? 1 : (this.isFacingRight ? 1 : -1);
                this.jukeTimer = 10;
                this.jukeCooldown = 48;

                if (defenderEnabled && Math.abs(defender.x - this.x) < 145) {
                    defender.stunTimer = 48;
                    defender.state = 'STUNNED';
                    addFloatingText(defender.x, defender.y - 115, 'ANKLES!', '#fbbf24');
                }
            },

            jumpToBlock() {
                if (gameState !== 'PLAYING' || !opponentHasPossession || this.jumpTimer > 0) return;
                this.jumpTimer = 12;
                this.jumpOffsetY = 72;
                audio.playSqueak();
            },

            update() {
                if (this.jukeCooldown > 0) this.jukeCooldown--;
                if (this.jumpTimer > 0) {
                    this.jumpTimer--;
                    this.jumpOffsetY = Math.max(0, this.jumpOffsetY - 6);
                }
                if (this.state !== 'SHOOTING') {
                    const direction = this.jukeTimer > 0
                        ? this.jukeDirection
                        : keys.left ? -1 : keys.right ? 1 : 0;
                    if (direction) {
                        this.vx = direction * this.speed * (this.jukeTimer > 0 ? 2.7 : 1);
                        this.isFacingRight = false;
                        if (direction > 0) this.isFacingRight = true;
                    } else {
                        this.vx = 0;
                    }

                    this.x += this.vx;
                    if (this.jukeTimer > 0) this.jukeTimer--;
                    if (Math.abs(this.vx) > 0) this.runCycle += Math.abs(this.vx) * 0.12;

                    // Court limits
                    if (this.x < 100) this.x = 100;
                    if (this.x > 875) this.x = 875;

                    if (Math.abs(this.vx) > 0 && Math.random() < 0.04) {
                        audio.playSqueak();
                    }
                }

                // Charging Shot Logic
                if (keys.space && ball.hasBall && !opponentHasPossession &&
                    checkUpTimer === 0 && !ball.isShot && this.state !== 'SHOOTING') {
                    this.state = 'CHARGING';
                    this.isCharging = true;
                    this.kneeBend = Math.min(12, this.kneeBend + 0.8);

                    this.power += 1.8 * this.powerDirection;
                    if (this.power >= 100) {
                        this.power = 100;
                        this.powerDirection = -1;
                    } else if (this.power <= 0) {
                        this.power = 0;
                        this.powerDirection = 1;
                    }

                    document.getElementById('powerBarFill').style.width = `${this.power}%`;
                    document.getElementById('powerPercentText').innerText = `${Math.round(this.power)}%`;
                }

                if (this.state === 'SHOOTING' && this.jumpTimer === 0) {
                    this.jumpOffsetY = Math.max(0, this.jumpOffsetY - 1.5);
                    this.kneeBend = Math.max(0, this.kneeBend - 0.8);
                    if (this.jumpOffsetY === 0) this.state = 'IDLE';
                }
            },

            draw(ctx) {
                ctx.save();
                ctx.translate(this.x, this.y - this.jumpOffsetY);

                // Shadow
                ctx.beginPath();
                ctx.ellipse(0, this.jumpOffsetY + 2, 22 - this.jumpOffsetY * 0.3, 6, 0, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
                ctx.fill();

                const bend = this.kneeBend;
                const running = Math.abs(this.vx) > 0.1 && this.state !== 'SHOOTING';
                const stride = running ? Math.sin(this.runCycle) * 9 : 0;

                // Legs
                ctx.strokeStyle = '#0f172a';
                ctx.lineWidth = 6;
                ctx.lineCap = 'round';

                ctx.beginPath();
                ctx.moveTo(-8, -35 + bend + stride * 0.35);
                ctx.lineTo(-12 - stride, -18 + bend / 2);
                ctx.lineTo(-10 - stride, 0);
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(8, -35 + bend - stride * 0.35);
                ctx.lineTo(12 + stride, -18 + bend / 2);
                ctx.lineTo(10 + stride, 0);
                ctx.stroke();

                // Sneakers
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(-14 - stride, -4, 8, 4);
                ctx.fillRect(8 + stride, -4, 8, 4);

                // Shorts
                ctx.fillStyle = '#1e293b';
                ctx.fillRect(-12, -45 + bend, 24, 15);

                // Jersey (Orange Home)
                ctx.fillStyle = '#f59e0b';
                ctx.beginPath();
                ctx.roundRect(-11, -72 + bend, 22, 30, 4);
                ctx.fill();

                // Number #23
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 11px Inter';
                ctx.textAlign = 'center';
                ctx.fillText('23', 0, -52 + bend);

                // Head
                ctx.fillStyle = '#d97706';
                ctx.beginPath();
                ctx.arc(0, -82 + bend, 10, 0, Math.PI * 2);
                ctx.fill();

                // Headband
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(-10, -88 + bend, 20, 4);

                // Shooting Arm Motion
                ctx.strokeStyle = '#d97706';
                ctx.lineWidth = 5;

                let armAngle = -Math.PI / 6;
                if (this.state === 'CHARGING') armAngle = -Math.PI / 4 + (this.power / 100) * 0.3;
                if (this.state === 'SHOOTING') armAngle = -Math.PI / 1.5;

                ctx.beginPath();
                ctx.moveTo(6, -65 + bend);
                const elbowX = 6 + Math.cos(armAngle) * 16;
                const elbowY = (-65 + bend) + Math.sin(armAngle) * 16;
                ctx.lineTo(elbowX, elbowY);
                ctx.lineTo(elbowX + 10, elbowY - 12);
                ctx.stroke();

                ctx.restore();
            }
        };

        // Defender AI Object
        const defender = {
            x: 660,
            y: FLOOR_Y,
            jumpOffsetY: 0,
            state: 'IDLE', // IDLE, TRACKING, JUMPING
            reactionDelay: 0,
            runCycle: 0,
            stunTimer: 0,
            offenseTimer: 0,
            checkupTimer: 0,
            isMoving: false,

            reset() {
                this.x = player.x + 70;
                this.y = FLOOR_Y;
                this.jumpOffsetY = 0;
                this.state = 'IDLE';
                this.runCycle = 0;
                this.stunTimer = 0;
                this.offenseTimer = 0;
                this.checkupTimer = 0;
                this.isMoving = false;
            },

            update() {
                this.isMoving = false;
                if (!defenderEnabled && !opponentHasPossession) return;

                if (this.stunTimer > 0) {
                    this.stunTimer--;
                    this.jumpOffsetY = 0;
                    return;
                }

                if (opponentHasPossession) {
                    if (this.checkupTimer > 0) {
                        this.checkupTimer--;
                        return;
                    }

                    const targetX = THREE_POINT_X;
                    const distance = targetX - this.x;
                    if (Math.abs(distance) > 5) {
                        const step = Math.sign(distance) * Math.min(2.5, Math.abs(distance));
                        this.x += step;
                        this.runCycle += Math.abs(step) * 0.12;
                        this.isMoving = true;
                    } else if (this.offenseTimer > 0) {
                        this.offenseTimer--;
                    } else {
                        ball.shoot(65, 1.26, 'DEFENDER');
                    }
                    return;
                }

                if (checkUpTimer > 0) {
                    checkUpTimer--;
                    return;
                }

                const targetX = Math.min(780, player.x + 65);

                // Follow shooter movement
                if (this.state !== 'JUMPING') {
                    const movement = (targetX - this.x) * 0.08;
                    this.x += movement;
                    if (Math.abs(movement) > 0.2) this.runCycle += Math.abs(movement) * 0.18;
                    this.isMoving = Math.abs(movement) > 0.2;

                    if (player.state === 'CHARGING' || player.state === 'SHOOTING') {
                        // AI Defender jumps to block!
                        if (Math.abs(this.x - player.x) < 95 && Math.random() < 0.1) {
                            this.state = 'JUMPING';
                            this.jumpOffsetY = 38; // Max jump height
                        }
                    }
                } else {
                    // Recover from jump
                    this.jumpOffsetY = Math.max(0, this.jumpOffsetY - 1.8);
                    if (this.jumpOffsetY === 0) this.state = 'IDLE';
                }
            },

            draw(ctx) {
                if (!defenderEnabled && !opponentHasPossession) return;

                ctx.save();
                ctx.translate(this.x, this.y - this.jumpOffsetY);
                if (this.stunTimer > 0) ctx.rotate(Math.sin(this.stunTimer * 0.25) * 0.22);

                // Shadow
                ctx.beginPath();
                ctx.ellipse(0, this.jumpOffsetY + 2, 22 - this.jumpOffsetY * 0.3, 6, 0, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
                ctx.fill();

                // Legs
                ctx.strokeStyle = '#020617';
                ctx.lineWidth = 6;
                ctx.lineCap = 'round';

                ctx.beginPath();
                const stride = this.isMoving && this.state !== 'JUMPING'
                    ? Math.sin(this.runCycle) * 8
                    : 0;
                ctx.moveTo(-8, -35 + stride * 0.3);
                ctx.lineTo(-12 - stride, -18);
                ctx.lineTo(-10 - stride, 0);
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(8, -35 - stride * 0.3);
                ctx.lineTo(12 + stride, -18);
                ctx.lineTo(10 + stride, 0);
                ctx.stroke();

                // Red Away Jersey
                ctx.fillStyle = '#ef4444';
                ctx.fillRect(-12, -45, 24, 15);
                ctx.beginPath();
                ctx.roundRect(-11, -72, 22, 30, 4);
                ctx.fill();

                // Defender Jersey Number #0
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 11px Inter';
                ctx.textAlign = 'center';
                ctx.fillText('0', 0, -52);

                // Head
                ctx.fillStyle = '#9a3412';
                ctx.beginPath();
                ctx.arc(0, -82, 10, 0, Math.PI * 2);
                ctx.fill();

                // Extended Arms (Blocking)
                ctx.strokeStyle = '#9a3412';
                ctx.lineWidth = 5.5;

                const armRaise = this.jumpOffsetY > 10 ? -Math.PI / 1.3 : -Math.PI / 3;

                ctx.beginPath();
                ctx.moveTo(-6, -65);
                ctx.lineTo(-6 + Math.cos(armRaise) * 22, -65 + Math.sin(armRaise) * 22);
                ctx.moveTo(6, -65);
                ctx.lineTo(6 + Math.cos(armRaise) * 22, -65 + Math.sin(armRaise) * 22);
                ctx.stroke();

                // Defender Block Hand Hitbox Marker
                const handX = -6 + Math.cos(armRaise) * 22;
                const handY = -65 + Math.sin(armRaise) * 22;
                ctx.fillStyle = '#ef4444';
                ctx.beginPath();
                ctx.arc(handX, handY, 7, 0, Math.PI * 2);
                ctx.fill();

                ctx.restore();
            }
        };

        // Basketball Physics Object
        const ball = {
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
            radius: 12,
            isShot: false,
            hasBall: true,
            isLoose: false,
            dribblePhase: 0,
            shotBy: 'PLAYER',
            rotation: 0,
            touchedRim: false,
            touchedBackboard: false,
            isScored: false,
            isBlocked: false,

            reset() {
                this.isShot = false;
                this.hasBall = true;
                this.isLoose = false;
                this.shotBy = 'PLAYER';
                this.vx = 0;
                this.vy = 0;
                this.rotation = 0;
                this.touchedRim = false;
                this.touchedBackboard = false;
                this.isScored = false;
                this.isBlocked = false;
                this.attachToPlayer();
            },

            attachToPlayer() {
                if (!this.isShot) {
                    const bend = player.kneeBend;
                    this.x = player.x + (player.isFacingRight ? 18 : -18);
                    this.y = player.y - 70 + bend - player.jumpOffsetY;
                }
            },

            shoot(power, angle, shooter = 'PLAYER') {
                if (this.isShot ||
                    (shooter === 'PLAYER' && (!this.hasBall || checkUpTimer > 0))) return;
                this.isShot = true;
                this.hasBall = false;
                this.isLoose = false;
                this.shotBy = shooter;
                if (shooter === 'PLAYER') {
                    player.state = 'SHOOTING';
                    player.jumpOffsetY = 14;
                }

                const speed = 12 + (power / 100) * 11;
                this.vx = Math.cos(angle) * speed;
                this.vy = -Math.sin(angle) * speed;

                if (shooter === 'PLAYER') totalShots++;
                shotClock = 24; // Reset shot clock on release
                updateHUD();
            },

            update() {
                if (!this.isShot) {
                    if (opponentHasPossession) {
                        this.x = defender.x - 22;
                        this.y = FLOOR_Y - this.radius -
                            Math.abs(Math.sin(defender.runCycle)) * 22;
                        this.rotation += 0.08;
                        return;
                    }

                    if (this.isLoose) {
                        if (gameState === 'PLAYING' && Math.abs(player.x - this.x) < 28) {
                            this.isLoose = false;
                            this.hasBall = true;
                        }
                        if (this.isLoose) return;
                    }

                    if (this.hasBall && gameState === 'PLAYING' && player.state !== 'CHARGING') {
                        this.dribblePhase += 0.13 + Math.abs(player.vx) * 0.012;
                        const bounce = Math.abs(Math.sin(this.dribblePhase)) * 24;
                        this.x = player.x + (player.isFacingRight ? 22 : -22) +
                            Math.cos(this.dribblePhase) * 3;
                        this.y = FLOOR_Y - this.radius - bounce;
                    } else {
                        this.attachToPlayer();
                    }
                    return;
                }

                // Defender Block Collision Detection
                if (this.shotBy === 'DEFENDER' && !this.isBlocked && !this.isScored) {
                    const defHandX = player.x + (player.isFacingRight ? 18 : -18);
                    const defHandY = player.y - player.jumpOffsetY - 88;
                    const distToBlock = Math.hypot(this.x - defHandX, this.y - defHandY);
                    if (player.jumpTimer > 0 && distToBlock < this.radius + 20) {
                        this.isBlocked = true;
                        this.vx = -Math.abs(this.vx) * 0.7 - 2;
                        this.vy = -Math.abs(this.vy) * 0.4;
                        audio.playBlock();
                        addFloatingText(this.x, this.y - 20, 'BLOCKED!', '#10b981');
                        createSparkles(this.x, this.y, '#10b981', 10);
                    }
                }

                if (this.shotBy === 'PLAYER' && defenderEnabled && !this.isBlocked && !this.isScored) {
                    const defHandX = defender.x - 18;
                    const defHandY = defender.y - defender.jumpOffsetY - 95;
                    const distToHand = Math.hypot(this.x - defHandX, this.y - defHandY);

                    if (distToHand < this.radius + 18) {
                        this.isBlocked = true;
                        this.vx = -Math.abs(this.vx) * 0.4 - 2;
                        this.vy = -Math.abs(this.vy) * 0.3 + 1;
                        audio.playBlock();
                        crowd.triggerGroan();
                        addFloatingText(this.x, this.y - 20, 'REJECTED! BLOCKED!', '#ef4444');
                        createSparkles(this.x, this.y, '#ef4444', 10);
                        streak = 0;
                        updateHUD();
                    }
                }

                // Gravity & Motion
                this.vy += GRAVITY;
                this.x += this.vx;
                this.y += this.vy;
                this.rotation += this.vx * 0.05;

                if (this.x < -this.radius ||
                    this.x > CANVAS_VIRTUAL_WIDTH + this.radius ||
                    this.y < -this.radius ||
                    this.y > CANVAS_VIRTUAL_HEIGHT + this.radius) {
                    if (this.shotBy === 'PLAYER') {
                        startDefenderPossession();
                    } else {
                        returnPossessionToPlayer('OUT OF BOUNDS!');
                    }
                    return;
                }

                // Floor Bounce
                if (this.y + this.radius >= FLOOR_Y) {
                    this.y = FLOOR_Y - this.radius;
                    this.vy = -this.vy * 0.6;
                    this.vx *= 0.8;
                    if (Math.abs(this.vy) > 1.5) {
                        audio.playBounce();
                        createSparkles(this.x, this.y + this.radius, '#f59e0b', 4);
                    }

                    if (Math.abs(this.vy) < 1 && Math.abs(this.vx) < 0.5) {
                        if (this.shotBy === 'DEFENDER') {
                            if (!this.isScored) {
                                crowd.triggerCheer();
                                returnPossessionToPlayer('THEY MISSED! YOUR BALL');
                            }
                            return;
                        }

                        if (!this.isScored && !this.isBlocked) {
                            streak = 0;
                            crowd.triggerMiss();
                            updateHUD();
                        } else if (this.isBlocked) {
                            crowd.triggerMiss();
                        }
                        this.vx = 0;
                        this.vy = 0;
                        this.isShot = false;
                        this.isLoose = true;
                    }
                }

                this.checkCollisions();
            },

            checkCollisions() {
                // 1. Backboard Collision
                if (this.x + this.radius >= COURT_HOOP.backboardX - 4 &&
                    this.x - this.radius <= COURT_HOOP.backboardX + 8 &&
                    this.y >= COURT_HOOP.backboardYTop &&
                    this.y <= COURT_HOOP.backboardYBottom) {
                    
                    this.x = COURT_HOOP.backboardX - 4 - this.radius;
                    this.vx = -this.vx * 0.65;
                    this.touchedBackboard = true;
                    audio.playRim();
                    createSparkles(this.x, this.y, '#ffffff', 5);
                }

                // 2. Breakaway Rim Collision with Spring Physics
                const frontRimNode = { x: COURT_HOOP.rimFrontX, y: COURT_HOOP.rimY + rimSpring.offsetY };
                const backRimNode = { x: COURT_HOOP.rimBackX, y: COURT_HOOP.rimY + rimSpring.offsetY };

                [frontRimNode, backRimNode].forEach(node => {
                    const dx = this.x - node.x;
                    const dy = this.y - node.y;
                    const dist = Math.hypot(dx, dy);

                    if (dist < this.radius + COURT_HOOP.rimRadius) {
                        const nx = dx / dist;
                        const ny = dy / dist;

                        const dot = this.vx * nx + this.vy * ny;
                        this.vx = (this.vx - 2 * dot * nx) * 0.72;
                        this.vy = (this.vy - 2 * dot * ny) * 0.72;

                        this.x = node.x + nx * (this.radius + COURT_HOOP.rimRadius);
                        this.y = node.y + ny * (this.radius + COURT_HOOP.rimRadius);

                        this.touchedRim = true;
                        rimSpring.triggerImpact(this.vy);
                        audio.playRim();
                        createSparkles(this.x, this.y, '#f97316', 6);
                    }
                });

                // 3. Score Net Sensor Check
                if (!this.isScored && this.vy > 0 &&
                    this.x > COURT_HOOP.rimFrontX + 4 &&
                    this.x < COURT_HOOP.rimBackX - 4 &&
                    this.y >= COURT_HOOP.rimY &&
                    this.y <= COURT_HOOP.rimY + 18) {

                    this.triggerScore();
                }
            },

            triggerScore() {
                if (this.shotBy === 'DEFENDER') {
                    this.isScored = true;
                    opponentScore++;
                    addFloatingText(this.x, this.y - 20, 'DEFENDER SCORES!', '#ef4444');
                    returnPossessionToPlayer('YOUR BALL - GUARD UP!');
                    return;
                }

                this.isScored = true;
                madeShots++;
                streak++;
                if (streak > maxStreak) maxStreak = streak;

                // Points calculation based on distance
                let basePoints = 2;
                if (player.x < LOGO_X) basePoints = 4; // Logo shot
                else if (player.x < THREE_POINT_X) basePoints = 3; // 3-Pointer
                else if (player.x > PAINT_X) basePoints = 1; // Paint layup

                let bonusText = [];
                let bonusPoints = 0;

                if (!this.touchedRim && !this.touchedBackboard) {
                    bonusPoints += 1;
                    swishCount++;
                    bonusText.push("PERFECT SWISH!");
                    audio.playSwish();
                } else {
                    audio.playSwish();
                }

                if (this.touchedBackboard) {
                    bonusPoints += 1;
                    bonusText.push("BANK SHOT!");
                }

                let multiplier = 1;
                if (streak >= 3) {
                    multiplier = 3;
                    bonusText.push("ON FIRE x3!");
                } else if (streak >= 2) {
                    multiplier = 2;
                    bonusText.push("HOT STREAK x2!");
                }

                const totalEarned = (basePoints + bonusPoints) * multiplier;
                score += totalEarned;

                // Trigger Net Ripple, LED Flash & Crowd Cheer
                net.triggerRipple(this.vx);
                redLEDFlashTimer = 25;
                crowd.triggerCheer();
                audio.playCheer();

                const feedbackString = bonusText.length > 0 ? bonusText.join(" | ") : `+${totalEarned} POINTS`;
                addFloatingText(this.x, this.y - 20, feedbackString, streak >= 3 ? '#f97316' : '#10b981');
                createConfetti(this.x, this.y);

                updateHUD();
            },

            draw(ctx) {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);

                // Ball Radial Shading
                const grad = ctx.createRadialGradient(-3, -3, 2, 0, 0, this.radius);
                grad.addColorStop(0, '#fb923c');
                grad.addColorStop(0.8, '#ea580c');
                grad.addColorStop(1, '#9a3412');

                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
                ctx.fill();

                // Black Seams
                ctx.strokeStyle = '#1c1917';
                ctx.lineWidth = 1.2;

                ctx.beginPath();
                ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(-this.radius, 0);
                ctx.lineTo(this.radius, 0);
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(0, 0, this.radius * 0.7, -Math.PI / 2, Math.PI / 2);
                ctx.stroke();

                ctx.restore();
            }
        };

        function startDefenderPossession() {
            if (opponentHasPossession) return;
            opponentHasPossession = true;
            defenderEnabled = true;
            document.getElementById('defenderToggle').checked = true;
            player.x = THREE_POINT_X - 75;
            player.vx = 0;
            player.isFacingRight = true;
            player.jumpOffsetY = 0;
            player.jumpTimer = 0;
            player.state = 'IDLE';
            keys.space = false;
            playerSpaceAction = null;
            ball.isShot = false;
            ball.hasBall = false;
            ball.isLoose = false;
            ball.shotBy = 'DEFENDER';
            ball.isScored = false;
            ball.isBlocked = false;
            ball.touchedRim = false;
            ball.touchedBackboard = false;
            ball.vx = 0;
            ball.vy = 0;
            defender.x = THREE_POINT_X;
            defender.state = 'OFFENSE';
            defender.checkupTimer = 55;
            defender.offenseTimer = 65;
            defender.runCycle = 0;
            checkUpTimer = 55;
            document.getElementById('modeStatusText').innerText =
                'CHECK UP AT THE 3! Guard the defender. Press SPACE to jump and block.';
            updatePossessionControls();
            addFloatingText(THREE_POINT_X, FLOOR_Y - 135, 'CHECK BALL!', '#fbbf24');
            addFloatingText(defender.x, defender.y - 120, 'DEFENDER BALL!', '#ef4444');
        }

        function returnPossessionToPlayer(message) {
            opponentHasPossession = false;
            defenderEnabled = true;
            document.getElementById('defenderToggle').checked = defenderEnabled;
            player.x = THREE_POINT_X;
            player.vx = 0;
            player.isFacingRight = true;
            player.jumpOffsetY = 0;
            player.jumpTimer = 0;
            player.state = 'IDLE';
            keys.space = false;
            playerSpaceAction = null;
            ball.isShot = false;
            ball.hasBall = true;
            ball.isLoose = false;
            ball.shotBy = 'PLAYER';
            ball.isScored = false;
            ball.isBlocked = false;
            ball.touchedRim = false;
            ball.touchedBackboard = false;
            ball.vx = 0;
            ball.vy = 0;
            ball.attachToPlayer();
            defender.x = THREE_POINT_X + 70;
            defender.y = FLOOR_Y;
            defender.jumpOffsetY = 0;
            defender.state = 'IDLE';
            defender.stunTimer = 0;
            defender.checkupTimer = 0;
            defender.offenseTimer = 0;
            checkUpTimer = 55;
            document.getElementById('modeStatusText').innerText =
                'CHECK UP AT THE 3! You have the ball. Defender is guarding. SPACE shoots.';
            updatePossessionControls();
            addFloatingText(THREE_POINT_X, FLOOR_Y - 135, 'CHECK BALL!', '#fbbf24');
            if (message) addFloatingText(player.x, player.y - 125, message, '#fbbf24');
            updateHUD();
        }

        function updatePossessionControls() {
            const shootLabel = document.querySelector('#btnTouchShoot span');
            if (shootLabel) {
                shootLabel.textContent = opponentHasPossession ? 'JUMP / BLOCK' : 'HOLD TO SHOOT';
            }
            const instruction = document.getElementById('powerMeterInstruction');
            if (instruction) {
                instruction.textContent = opponentHasPossession
                    ? 'Defense: press SPACE to jump and block.'
                    : 'Hold SPACE to shoot; walk to the ball to recover it.';
            }
        }

        // Breakaway Rim Spring System
        const rimSpring = {
            offsetY: 0,
            vy: 0,

            triggerImpact(vy) {
                this.vy = Math.min(12, Math.abs(vy) * 0.8);
            },

            update() {
                const k = 0.2; // Spring stiffness
                const damping = 0.82; // Damping factor
                const force = -k * this.offsetY;
                this.vy += force;
                this.vy *= damping;
                this.offsetY += this.vy;
            }
        };

        // Dynamic Net Physics
        const net = {
            nodes: [],
            init() {
                this.nodes = [];
                const segments = 6;
                const width = COURT_HOOP.rimBackX - COURT_HOOP.rimFrontX;
                for (let i = 0; i <= segments; i++) {
                    this.nodes.push({
                        x: COURT_HOOP.rimFrontX + (width / segments) * i,
                        y: COURT_HOOP.rimY + 35,
                        baseX: COURT_HOOP.rimFrontX + (width / segments) * i,
                        vx: 0
                    });
                }
            },

            triggerRipple(vx) {
                this.nodes.forEach(node => { node.vx = vx * 0.4; });
            },

            update() {
                this.nodes.forEach(node => {
                    const dx = node.baseX - node.x;
                    node.vx += dx * 0.15;
                    node.vx *= 0.82;
                    node.x += node.vx;
                });
            },

            draw(ctx) {
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 1.6;
                ctx.globalAlpha = 0.85;

                const topFrontX = COURT_HOOP.rimFrontX;
                const topBackX = COURT_HOOP.rimBackX;
                const topY = COURT_HOOP.rimY + rimSpring.offsetY;

                ctx.beginPath();
                this.nodes.forEach((node, i) => {
                    const topX = topFrontX + ((topBackX - topFrontX) / (this.nodes.length - 1)) * i;
                    ctx.moveTo(topX, topY);
                    ctx.lineTo(node.x, node.y + rimSpring.offsetY * 0.5);
                });
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(topFrontX + 3, topY + 12);
                ctx.lineTo(topBackX - 3, topY + 12);
                ctx.moveTo(this.nodes[0].x, this.nodes[0].y + rimSpring.offsetY * 0.5);
                ctx.lineTo(this.nodes[this.nodes.length - 1].x, this.nodes[this.nodes.length - 1].y + rimSpring.offsetY * 0.5);
                ctx.stroke();

                ctx.globalAlpha = 1.0;
            }
        };
        net.init();

        // Particles & Floating FX
        let particles = [];
        let floatingTexts = [];

        function createSparkles(x, y, color, count = 5) {
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: x, y: y,
                    vx: (Math.random() - 0.5) * 6,
                    vy: (Math.random() - 0.5) * 6,
                    radius: Math.random() * 3 + 1,
                    color: color, alpha: 1, life: 0.04
                });
            }
        }

        function createConfetti(x, y) {
            const colors = ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#f97316'];
            for (let i = 0; i < 25; i++) {
                particles.push({
                    x: x, y: y,
                    vx: (Math.random() - 0.5) * 10,
                    vy: (Math.random() - 0.8) * 8,
                    radius: Math.random() * 4 + 2,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    alpha: 1, life: 0.02
                });
            }
        }

        function addFloatingText(x, y, text, color = '#f59e0b') {
            floatingTexts.push({ x: x, y: y, text: text, color: color, alpha: 1, vy: -1.2 });
        }

        function updateParticles() {
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.x += p.vx; p.y += p.vy; p.alpha -= p.life;
                if (p.alpha <= 0) particles.splice(i, 1);
            }

            for (let i = floatingTexts.length - 1; i >= 0; i--) {
                const t = floatingTexts[i];
                t.y += t.vy; t.alpha -= 0.015;
                if (t.alpha <= 0) floatingTexts.splice(i, 1);
            }
        }

        function drawParticles(ctx) {
            particles.forEach(p => {
                ctx.save();
                ctx.globalAlpha = Math.max(0, p.alpha);
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });

            floatingTexts.forEach(t => {
                ctx.save();
                ctx.globalAlpha = Math.max(0, t.alpha);
                ctx.fillStyle = t.color;
                ctx.font = 'bold 20px Teko, sans-serif';
                ctx.textAlign = 'center';
                ctx.shadowColor = 'rgba(0,0,0,0.9)';
                ctx.shadowBlur = 6;
                ctx.fillText(t.text, t.x, t.y);
                ctx.restore();
            });
        }

        // ==========================================
        // 5. INDOOR GYM ENVIRONMENT & SCOREBOARD RENDERER
        // ==========================================
        function drawIndoorGymBackground(ctx) {
            // Gym Ceiling & Rafter Area
            ctx.fillStyle = '#090d16';
            ctx.fillRect(0, 0, CANVAS_VIRTUAL_WIDTH, CANVAS_VIRTUAL_HEIGHT);

            // Wall Wood Paneling / Brick Texture
            const wallGrad = ctx.createLinearGradient(0, 0, 0, FLOOR_Y);
            wallGrad.addColorStop(0, '#1e293b');
            wallGrad.addColorStop(0.7, '#0f172a');
            wallGrad.addColorStop(1, '#020617');
            ctx.fillStyle = wallGrad;
            ctx.fillRect(0, 0, CANVAS_VIRTUAL_WIDTH, FLOOR_Y);

            // Overhead Metal Truss Rafters
            ctx.strokeStyle = '#334155';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(0, 40); ctx.lineTo(CANVAS_VIRTUAL_WIDTH, 40);
            ctx.moveTo(0, 70); ctx.lineTo(CANVAS_VIRTUAL_WIDTH, 70);
            for (let x = 0; x < CANVAS_VIRTUAL_WIDTH; x += 50) {
                ctx.moveTo(x, 40); ctx.lineTo(x + 25, 70);
                ctx.lineTo(x + 50, 40);
            }
            ctx.stroke();

            // Gym High-Bay Overhead Lights
            [200, 500, 800].forEach(lightX => {
                ctx.fillStyle = '#fef08a';
                ctx.beginPath();
                ctx.arc(lightX, 40, 16, 0, Math.PI * 2);
                ctx.fill();

                // Subtle Cone Glow
                const coneGrad = ctx.createLinearGradient(lightX, 40, lightX, FLOOR_Y);
                coneGrad.addColorStop(0, 'rgba(254, 240, 138, 0.15)');
                coneGrad.addColorStop(1, 'rgba(254, 240, 138, 0)');
                ctx.fillStyle = coneGrad;
                ctx.beginPath();
                ctx.moveTo(lightX - 15, 40);
                ctx.lineTo(lightX + 15, 40);
                ctx.lineTo(lightX + 120, FLOOR_Y);
                ctx.lineTo(lightX - 120, FLOOR_Y);
                ctx.fill();
            });

            // Draw Bleachers & Crowd
            crowd.draw(ctx);

            // --- WALL MOUNTED DIGITAL SCOREBOARD ---
            const sbX = 390, sbY = 75, sbW = 220, sbH = 110;
            
            // Scoreboard Frame
            ctx.fillStyle = '#020617';
            ctx.strokeStyle = '#334155';
            ctx.lineWidth = 4;
            ctx.fillRect(sbX, sbY, sbW, sbH);
            ctx.strokeRect(sbX, sbY, sbW, sbH);

            // LED Headers
            ctx.fillStyle = '#94a3b8';
            ctx.font = 'bold 11px Inter';
            ctx.textAlign = 'center';
            ctx.fillText('HOME', sbX + 45, sbY + 20);
            ctx.fillText('GUEST', sbX + sbW - 45, sbY + 20);
            ctx.fillText('SHOT CLOCK', sbX + sbW / 2, sbY + 68);

            // LED Digits (Orbitron / Digital style)
            ctx.font = 'bold 24px Orbitron, monospace';
            
            // Home Score
            ctx.fillStyle = '#f59e0b';
            ctx.fillText(score.toString().padStart(3, '0'), sbX + 45, sbY + 48);

            // Guest / Defender Blocks
            ctx.fillStyle = '#ef4444';
            ctx.fillText(opponentScore.toString().padStart(3, '0'), sbX + sbW - 45, sbY + 48);

            // Timer & Shot Clock Display
            ctx.fillStyle = '#10b981';
            ctx.font = 'bold 18px Orbitron, monospace';
            const timeStr = `${Math.floor(gameTimeLeft / 60)}:${(gameTimeLeft % 60).toString().padStart(2, '0')}`;
            ctx.fillText(timeStr, sbX + sbW / 2, sbY + 44);

            ctx.fillStyle = '#f97316';
            ctx.fillText(shotClock.toString().padStart(2, '0'), sbX + sbW / 2, sbY + 95);

            // --- HARDWOOD PARQUET COURT FLOOR ---
            const floorGrad = ctx.createLinearGradient(0, FLOOR_Y, 0, CANVAS_VIRTUAL_HEIGHT);
            floorGrad.addColorStop(0, '#ea580c');
            floorGrad.addColorStop(0.15, '#d97706');
            floorGrad.addColorStop(1, '#78350f');
            ctx.fillStyle = floorGrad;
            ctx.fillRect(0, FLOOR_Y, CANVAS_VIRTUAL_WIDTH, CANVAS_VIRTUAL_HEIGHT - FLOOR_Y);

            // Parquet Staggered Wood Planks
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.12)';
            ctx.lineWidth = 1;
            for (let y = FLOOR_Y + 10; y < CANVAS_VIRTUAL_HEIGHT; y += 14) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(CANVAS_VIRTUAL_WIDTH, y);
                ctx.stroke();
            }

            // Glossy Floor Reflection Sheen
            const glossGrad = ctx.createLinearGradient(0, FLOOR_Y, 0, FLOOR_Y + 40);
            glossGrad.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
            glossGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.fillStyle = glossGrad;
            ctx.fillRect(0, FLOOR_Y, CANVAS_VIRTUAL_WIDTH, 40);

            // Key Paint Area Fill
            ctx.fillStyle = 'rgba(30, 58, 138, 0.5)';
            ctx.fillRect(PAINT_X, FLOOR_Y, CANVAS_VIRTUAL_WIDTH - PAINT_X, 100);

            // Court Markings (White Lines)
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 3.5;

            // Free Throw Line & 3-Point Line
            ctx.beginPath();
            ctx.moveTo(FREE_THROW_X, FLOOR_Y); ctx.lineTo(FREE_THROW_X, FLOOR_Y + 15);
            ctx.moveTo(THREE_POINT_X, FLOOR_Y); ctx.lineTo(THREE_POINT_X, FLOOR_Y + 20);
            ctx.stroke();

            // Court Line Text Labels
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 10px Inter';
            ctx.textAlign = 'center';
            ctx.fillText('3PT LINE', THREE_POINT_X, FLOOR_Y + 32);
            ctx.fillText('FREE THROW', FREE_THROW_X, FLOOR_Y + 32);

            // Center Court Logo
            ctx.save();
            ctx.globalAlpha = 0.18;
            ctx.fillStyle = '#ffffff';
            ctx.font = '900 48px Teko';
            ctx.textAlign = 'center';
            ctx.fillText('GYM HOOPS', LOGO_X, FLOOR_Y + 60);
            ctx.restore();

            // --- HOOP STRUCTURE & BACKBOARD ---
            // Ceiling Hydraulic Mount Arm
            ctx.strokeStyle = '#334155';
            ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.moveTo(940, 0);
            ctx.lineTo(940, 180);
            ctx.lineTo(COURT_HOOP.backboardX + 10, 180);
            ctx.stroke();

            // Safety Padding
            ctx.fillStyle = '#ef4444';
            ctx.fillRect(915, FLOOR_Y - 70, 50, 70);

            // Glass Backboard
            ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 4;
            ctx.fillRect(COURT_HOOP.backboardX, COURT_HOOP.backboardYTop, 10, COURT_HOOP.backboardYBottom - COURT_HOOP.backboardYTop);
            ctx.strokeRect(COURT_HOOP.backboardX, COURT_HOOP.backboardYTop, 10, COURT_HOOP.backboardYBottom - COURT_HOOP.backboardYTop);

            // Target Inner Square
            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 3;
            ctx.strokeRect(COURT_HOOP.backboardX, COURT_HOOP.rimY - 30, 8, 45);

            // RED LED STRIP BORDER (Flashes on score/clock end)
            if (redLEDFlashTimer > 0) {
                redLEDFlashTimer--;
                ctx.strokeStyle = '#ef4444';
                ctx.lineWidth = 6;
                ctx.shadowColor = '#ef4444';
                ctx.shadowBlur = 15;
                ctx.strokeRect(COURT_HOOP.backboardX - 2, COURT_HOOP.backboardYTop - 2, 14, COURT_HOOP.backboardYBottom - COURT_HOOP.backboardYTop + 4);
                ctx.shadowBlur = 0;
            }

            // Breakaway Orange Rim
            ctx.strokeStyle = '#ea580c';
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(COURT_HOOP.rimFrontX, COURT_HOOP.rimY + rimSpring.offsetY);
            ctx.lineTo(COURT_HOOP.rimBackX, COURT_HOOP.rimY + rimSpring.offsetY);
            ctx.stroke();
        }

        // Dotted Trajectory Arc Preview
        function drawTrajectoryGuide(ctx) {
            if (ball.isShot || !ball.hasBall) return;

            let power = player.power;
            let angle = Math.PI / 3.2;

            if (isDraggingMouse) {
                const dx = dragStartX - currentMouseX;
                const dy = dragStartY - currentMouseY;
                power = Math.min(100, Math.hypot(dx, dy) * 0.8);
                angle = Math.atan2(dy, dx);
            }

            if (power <= 2) return;

            const startX = player.x + 18;
            const startY = player.y - 70;
            const speed = 12 + (power / 100) * 11;
            let simX = startX;
            let simY = startY;
            let simVx = Math.cos(angle) * speed;
            let simVy = -Math.sin(angle) * speed;

            ctx.save();
            ctx.fillStyle = 'rgba(251, 146, 60, 0.85)';

            for (let i = 0; i < 28; i++) {
                simY += simVy;
                simVx *= 0.999;
                simVy += GRAVITY;
                simX += simVx;

                if (simY >= FLOOR_Y || simX > CANVAS_VIRTUAL_WIDTH) break;

                ctx.beginPath();
                ctx.arc(simX, simY, 3 - (i * 0.08), 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        }

        // ==========================================
        // 6. INPUT HANDLERS & TOUCH LISTENERS
        // ==========================================
        let isDraggingMouse = false;
        let dragStartX = 0, dragStartY = 0;
        let currentMouseX = 0, currentMouseY = 0;

        function getCanvasCoords(e) {
            const rect = canvas.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            return {
                x: (clientX - rect.left) * (CANVAS_VIRTUAL_WIDTH / rect.width),
                y: (clientY - rect.top) * (CANVAS_VIRTUAL_HEIGHT / rect.height)
            };
        }

        canvas.addEventListener('mousedown', (e) => {
            audio.init();
            if (gameState !== 'PLAYING' || ball.isShot || !ball.hasBall) return;
            const coords = getCanvasCoords(e);
            isDraggingMouse = true;
            dragStartX = coords.x; dragStartY = coords.y;
            currentMouseX = coords.x; currentMouseY = coords.y;
        });

        canvas.addEventListener('mousemove', (e) => {
            if (!isDraggingMouse) return;
            const coords = getCanvasCoords(e);
            currentMouseX = coords.x; currentMouseY = coords.y;
        });

        window.addEventListener('mouseup', () => {
            if (isDraggingMouse && !ball.isShot && ball.hasBall) {
                const dx = dragStartX - currentMouseX;
                const dy = dragStartY - currentMouseY;
                const power = Math.min(100, Math.hypot(dx, dy) * 0.8);
                const angle = Math.atan2(dy, dx);

                if (power > 10 && dy > 0) {
                    ball.shoot(power, angle);
                }
            }
            isDraggingMouse = false;
        });

        // Touch drag events
        canvas.addEventListener('touchstart', (e) => {
            audio.init();
            if (gameState !== 'PLAYING' || ball.isShot || !ball.hasBall) return;
            const coords = getCanvasCoords(e);
            isDraggingMouse = true;
            dragStartX = coords.x; dragStartY = coords.y;
            currentMouseX = coords.x; currentMouseY = coords.y;
        }, { passive: true });

        canvas.addEventListener('touchmove', (e) => {
            if (!isDraggingMouse) return;
            const coords = getCanvasCoords(e);
            currentMouseX = coords.x; currentMouseY = coords.y;
        }, { passive: true });

        canvas.addEventListener('touchend', () => {
            if (isDraggingMouse && !ball.isShot && ball.hasBall) {
                const dx = dragStartX - currentMouseX;
                const dy = dragStartY - currentMouseY;
                const power = Math.min(100, Math.hypot(dx, dy) * 0.8);
                const angle = Math.atan2(dy, dx);

                if (power > 10 && dy > 0) {
                    ball.shoot(power, angle);
                }
            }
            isDraggingMouse = false;
        });

        // Keyboard Controls
        window.addEventListener('keydown', (e) => {
            audio.init();
            if (e.code === 'KeyA' || e.code === 'ArrowLeft') keys.left = true;
            if (e.code === 'KeyD' || e.code === 'ArrowRight') keys.right = true;

            if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
                if (!e.repeat) player.performJuke();
            }

            if (e.code === 'Space' && !e.repeat) {
                if (opponentHasPossession) {
                    playerSpaceAction = 'block';
                    player.jumpToBlock();
                    return;
                }
                playerSpaceAction = 'shoot';
                keys.space = true;
                player.power = 0;
                player.powerDirection = 1;
            }
        });

        window.addEventListener('keyup', (e) => {
            if (e.code === 'KeyA' || e.code === 'ArrowLeft') keys.left = false;
            if (e.code === 'KeyD' || e.code === 'ArrowRight') keys.right = false;

            if (e.code === 'Space') {
                keys.space = false;
                const spaceAction = playerSpaceAction;
                playerSpaceAction = null;
                if (spaceAction === 'block') return;
                if (spaceAction === 'shoot' && ball.hasBall && !opponentHasPossession &&
                    !ball.isShot && gameState === 'PLAYING') {
                    ball.shoot(player.power, Math.PI / 3.2);
                }
                player.power = 0;
                document.getElementById('powerBarFill').style.width = '0%';
                document.getElementById('powerPercentText').innerText = '0%';
            }
        });

        // Touch Mobile Buttons
        const btnLeft = document.getElementById('btnTouchLeft');
        const btnRight = document.getElementById('btnTouchRight');
        const btnShoot = document.getElementById('btnTouchShoot');
        const btnJuke = document.getElementById('btnTouchJuke');

        btnLeft.addEventListener('touchstart', (e) => { e.preventDefault(); keys.left = true; });
        btnLeft.addEventListener('touchend', (e) => { e.preventDefault(); keys.left = false; });
        btnRight.addEventListener('touchstart', (e) => { e.preventDefault(); keys.right = true; });
        btnRight.addEventListener('touchend', (e) => { e.preventDefault(); keys.right = false; });
        btnJuke.addEventListener('click', () => player.performJuke());

        btnShoot.addEventListener('touchstart', (e) => {
            e.preventDefault(); audio.init();
            if (opponentHasPossession) {
                playerSpaceAction = 'block';
                player.jumpToBlock();
                return;
            }
            playerSpaceAction = 'shoot';
            keys.space = true; player.power = 0; player.powerDirection = 1;
        });

        btnShoot.addEventListener('touchend', (e) => {
            e.preventDefault(); keys.space = false;
            if (playerSpaceAction === 'block') {
                playerSpaceAction = null;
                return;
            }
            playerSpaceAction = null;
            if (ball.hasBall && !opponentHasPossession && !ball.isShot && gameState === 'PLAYING') {
                ball.shoot(player.power, Math.PI / 3.2);
            }
            player.power = 0;
            document.getElementById('powerBarFill').style.width = '0%';
            document.getElementById('powerPercentText').innerText = '0%';
        });

        // ==========================================
        // 7. GAME MODE & STATE MANAGEMENT
        // ==========================================
        function toggleDefenderMode(enabled) {
            defenderEnabled = enabled;
            document.getElementById('defenderToggle').checked = enabled;
            if (enabled) {
                defender.reset();
                addFloatingText(500, 200, 'DEFENDER ACTIVATED!', '#ef4444');
            }
        }

        function switchGameMode(mode) {
            currentGameMode = mode;
            document.getElementById('modeBlitz').className = mode === 'blitz' ? 'px-3 py-1.5 rounded-lg font-semibold transition bg-amber-500 text-slate-950 shadow-md' : 'px-3 py-1.5 rounded-lg font-semibold text-slate-400 hover:text-white transition';
            document.getElementById('modeFT').className = mode === 'ft' ? 'px-3 py-1.5 rounded-lg font-semibold transition bg-amber-500 text-slate-950 shadow-md' : 'px-3 py-1.5 rounded-lg font-semibold text-slate-400 hover:text-white transition';
            document.getElementById('modeDefend').className = mode === 'defender' ? 'px-3 py-1.5 rounded-lg font-semibold transition bg-amber-500 text-slate-950 shadow-md' : 'px-3 py-1.5 rounded-lg font-semibold text-slate-400 hover:text-white transition';
            document.getElementById('modePractice').className = mode === 'practice' ? 'px-3 py-1.5 rounded-lg font-semibold transition bg-amber-500 text-slate-950 shadow-md' : 'px-3 py-1.5 rounded-lg font-semibold text-slate-400 hover:text-white transition';

            const modeLabelMap = { blitz: '60s Blitz', ft: 'FT Shootout', defender: 'Defender Challenge', practice: 'Free Practice' };
            document.getElementById('currentModeLabel').innerText = modeLabelMap[mode];

            if (mode === 'defender') {
                toggleDefenderMode(true);
            } else if (mode === 'ft') {
                player.x = FREE_THROW_X;
            }

            const timerCard = document.getElementById('timerCard');
            if (mode === 'practice') {
                timerCard.classList.add('hidden');
            } else {
                timerCard.classList.remove('hidden');
            }

            resetGame();
        }

        function updateHUD() {
            document.getElementById('scoreDisplay').innerText = score;
            document.getElementById('highScoreDisplay').innerText = highScore;
            document.getElementById('streakDisplay').innerText = `${streak}x`;

            const accuracy = totalShots > 0 ? Math.round((madeShots / totalShots) * 100) : 100;
            document.getElementById('accuracyDisplay').innerText = `${accuracy}%`;

            const distFeet = (Math.abs(COURT_HOOP.rimFrontX - player.x) / 18).toFixed(1);
            let shotType = 'MID-RANGE';
            if (player.x < LOGO_X) shotType = 'DEEP LOGO SHOT';
            else if (player.x < THREE_POINT_X) shotType = '3-POINTER';
            else if (player.x > PAINT_X) shotType = 'PAINT LAYUP';
            else if (Math.abs(player.x - FREE_THROW_X) < 25) shotType = 'FREE THROW';

            document.getElementById('distanceMeter').innerText = `${distFeet} FT (${shotType})`;

            const streakContainer = document.getElementById('streakContainer');
            if (streak >= 3) {
                streakContainer.className = 'arcade-card px-3 py-1.5 rounded-lg border border-orange-500 text-center min-w-[70px] glow-orange animate-streak';
            } else {
                streakContainer.className = 'arcade-card px-3 py-1.5 rounded-lg border border-orange-500/40 text-center min-w-[70px]';
            }
        }

        function startGameSession() {
            document.getElementById('gameOverlay').classList.add('hidden');
            gameState = 'PLAYING';
            score = 0; streak = 0; maxStreak = 0;
            opponentScore = 0;
            totalShots = 0; madeShots = 0; swishCount = 0;
            gameTimeLeft = 60; shotClock = 24;
            opponentHasPossession = false;
            checkUpTimer = 0;
            keys.space = false;
            playerSpaceAction = null;

            player.reset();
            ball.reset();
            defender.reset();
            updatePossessionControls();
            updateHUD();

            if (timerInterval) clearInterval(timerInterval);

            if (currentGameMode !== 'practice') {
                timerInterval = setInterval(() => {
                    gameTimeLeft--;
                    shotClock--;
                    if (shotClock <= 0) shotClock = 24;

                    document.getElementById('timerDisplay').innerText = `${gameTimeLeft}s`;
                    if (gameTimeLeft <= 0) endGameSession();
                }, 1000);
            }
        }

        function endGameSession() {
            gameState = 'GAMEOVER';
            clearInterval(timerInterval);
            audio.playBuzzer();
            redLEDFlashTimer = 40;

            if (score > highScore) {
                highScore = score;
                localStorage.setItem('gym_hoops_high_score', highScore.toString());
            }

            document.getElementById('scoreStatsContainer').classList.remove('hidden');
            document.getElementById('finalScoreVal').innerText = score;
            const accuracy = totalShots > 0 ? Math.round((madeShots / totalShots) * 100) : 0;
            document.getElementById('finalAccuracyVal').innerText = `${accuracy}%`;
            document.getElementById('finalStreakVal').innerText = `${maxStreak}x`;
            document.getElementById('finalSwishesVal').innerText = swishCount;

            document.getElementById('overlayIcon').className = 'fa-solid fa-flag-checkered';
            document.getElementById('overlayTitle').innerText = 'TIME\'S UP!';
            document.getElementById('overlaySubtitle').innerText = 'Gym session complete! See your performance below:';
            document.getElementById('startOverlayBtn').innerText = 'PLAY AGAIN';
            document.getElementById('gameOverlay').classList.remove('hidden');
            updateHUD();
        }

        function resetGame() {
            clearInterval(timerInterval);
            gameState = 'IDLE';
            score = 0; streak = 0; totalShots = 0; madeShots = 0;
            opponentScore = 0;
            gameTimeLeft = 60; shotClock = 24;
            opponentHasPossession = false;
            checkUpTimer = 0;
            keys.space = false;
            playerSpaceAction = null;
            document.getElementById('timerDisplay').innerText = '60s';

            player.reset();
            ball.reset();
            defender.reset();
            updatePossessionControls();
            updateHUD();

            document.getElementById('scoreStatsContainer').classList.add('hidden');
            document.getElementById('overlayIcon').className = 'fa-solid fa-trophy';
            document.getElementById('overlayTitle').innerText = currentGameMode.toUpperCase() + ' MODE';
            document.getElementById('overlaySubtitle').innerText = 'Move with WASD/Arrows, SHIFT to juke, then shoot with SPACE or drag.';
            document.getElementById('startOverlayBtn').innerText = 'START GAME';
            document.getElementById('gameOverlay').classList.remove('hidden');
        }

        // Sound & Modal Listeners
        document.getElementById('soundBtn').addEventListener('click', () => {
            audio.enabled = !audio.enabled;
            const icon = document.getElementById('soundIcon');
            icon.className = audio.enabled ? 'fa-solid fa-volume-high text-lg' : 'fa-solid fa-volume-xmark text-lg text-red-400';
        });

        function toggleInfoModal() {
            document.getElementById('infoModal').classList.toggle('hidden');
        }
        document.getElementById('infoBtn').addEventListener('click', toggleInfoModal);

        function resizeCanvas() {
            canvas.width = CANVAS_VIRTUAL_WIDTH;
            canvas.height = CANVAS_VIRTUAL_HEIGHT;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // ==========================================
        // 8. MAIN ENGINE ANIMATION LOOP
        // ==========================================
        function gameLoop() {
            ctx.clearRect(0, 0, CANVAS_VIRTUAL_WIDTH, CANVAS_VIRTUAL_HEIGHT);

            drawIndoorGymBackground(ctx);
            drawTrajectoryGuide(ctx);

            if (gameState === 'PLAYING') {
                player.update();
                defender.update();
                ball.update();
                rimSpring.update();
                net.update();
                crowd.update();
                updateParticles();
            }

            net.draw(ctx);
            defender.draw(ctx);
            player.draw(ctx);
            ball.draw(ctx);
            drawParticles(ctx);

            requestAnimationFrame(gameLoop);
        }

        window.onload = function() {
            updateHUD();
            gameLoop();
        };
