document.addEventListener('DOMContentLoaded', function() {
            const ageVerificationModal = document.getElementById('ageVerificationModal');
            const ageVerificationYes = document.getElementById('ageVerificationYes');
            const ageVerificationNo = document.getElementById('ageVerificationNo');

            // Show age verification modal on page load
            ageVerificationModal.style.display = 'block';

            ageVerificationYes.addEventListener('click', function() {
                ageVerificationModal.style.display = 'none';
            });

            ageVerificationNo.addEventListener('click', function() {
                window.location.href = 'https://www.google.com';
            });

            const categories = document.querySelectorAll('.category');
            const profiles = document.querySelectorAll('.profile');
            const modal = document.getElementById('chatModal');
            const closeBtn = document.getElementsByClassName('close')[0];
            const modalTitle = document.getElementById('modalTitle');
            const chatContent = document.getElementById('chatContent');
            const userInput = document.getElementById('userInput');
            const sendMessage = document.getElementById('sendMessage');
            const searchInput = document.getElementById('searchInput');

            const scheduleModal = document.getElementById('scheduleModal');
            const scheduleModalTitle = document.getElementById('scheduleModalTitle');
            const scheduleForm = document.getElementById('scheduleForm');

            const profileModal = document.getElementById('profileModal');
            const fullProfileContent = document.getElementById('fullProfileContent');
            const commentsList = document.getElementById('commentsList');
            const newCommentInput = document.getElementById('newCommentInput');
            const submitComment = document.getElementById('submitComment');

            // Sample comments data (replace with actual data storage/retrieval)
            const commentsData = {
                'Élise': [
                    { user: 'Jean', comment: 'Élise est vraiment charmante et intelligente!' },
                    { user: 'Marie', comment: 'J\'ai adoré notre conversation sur l\'art moderne.' }
                ],
                'Sophie': [
                    { user: 'Pierre', comment: 'Sophie connaît vraiment ses vins. Quelle expérience!' },
                    { user: 'Lucie', comment: 'Sa passion pour l\'œnologie est contagieuse.' }
                ],
            };

            const featuredWomen = document.querySelectorAll('.featured-woman');

            featuredWomen.forEach(woman => {
                woman.addEventListener('click', function() {
                    const name = this.getAttribute('data-name');
                    const profile = Array.from(profiles).find(profile => profile.querySelector('h2').textContent === name);
                    
                    if (profile) {
                        const viewProfileBtn = profile.querySelector('.view-profile-btn');
                        viewProfileBtn.click();
                    }
                });
            });

            categories.forEach(category => {
                category.addEventListener('click', function() {
                    const selectedCategory = this.getAttribute('data-category');
                    profiles.forEach(profile => {
                        if (selectedCategory === 'all' || profile.getAttribute('data-category') === selectedCategory) {
                            profile.style.display = 'block';
                        } else {
                            profile.style.display = 'none';
                        }
                    });
                });
            });

            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                profiles.forEach(profile => {
                    const name = profile.querySelector('h2').textContent.toLowerCase();
                    const description = profile.querySelector('p').textContent.toLowerCase();
                    if (name.includes(searchTerm) || description.includes(searchTerm)) {
                        profile.style.display = 'block';
                    } else {
                        profile.style.display = 'none';
                    }
                });
            });

            document.querySelectorAll('.chat-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const name = this.getAttribute('data-name');
                    modalTitle.textContent = `Conversation avec ${name}`;
                    chatContent.innerHTML = '';
                    
                    const socialButtons = this.closest('.profile-info').querySelector('.social-buttons').cloneNode(true);
                    chatContent.appendChild(socialButtons);
                    
                    modal.style.display = 'block';
                });
            });

            document.querySelectorAll('.schedule-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const name = this.getAttribute('data-name');
                    scheduleModalTitle.textContent = `Organiser un rendez-vous avec ${name}`;
                    scheduleModal.style.display = 'block';
                });
            });

            document.querySelectorAll('.view-profile-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const name = this.getAttribute('data-name');
                    const profile = this.closest('.profile');
                    const profileImage = profile.querySelector('.profile-image').innerHTML;
                    const profileInfo = profile.querySelector('.profile-info').innerHTML;

                    fullProfileContent.innerHTML = `
                        
                        <div class="profile-info">${profileInfo}</div>
                    `;

                    // Load comments
                    commentsList.innerHTML = '';
                    if (commentsData[name]) {
                        commentsData[name].forEach(comment => {
                            commentsList.innerHTML += `
                                <div class="comment">
                                    <strong>${comment.user}:</strong> ${comment.comment}
                                </div>
                            `;
                        });
                    }

                    profileModal.style.display = 'block';
                });
            });

            submitComment.addEventListener('click', function() {
                const comment = newCommentInput.value.trim();
                if (comment) {
                    const name = fullProfileContent.querySelector('h2').textContent;
                    if (!commentsData[name]) {
                        commentsData[name] = [];
                    }
                    commentsData[name].push({ user: 'Vous', comment: comment });
                    commentsList.innerHTML += `
                        <div class="comment">
                            <strong>Vous:</strong> ${comment}
                        </div>
                    `;
                    newCommentInput.value = '';
                }
            });

            scheduleForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const name = scheduleModalTitle.textContent.split(' ').pop();
                const date = document.getElementById('dateInput').value;
                const time = document.getElementById('timeInput').value;
                const location = document.getElementById('locationInput').value;
                const duration = document.getElementById('durationInput').value;
                const services = document.getElementById('servicesInput').value;

                alert(`Rendez-vous confirmé avec ${name}:\nDate: ${date}\nHeure: ${time}\nLieu: ${location}\nDurée: ${duration} heures\nServices: ${services}`);
                scheduleModal.style.display = 'none';
                scheduleForm.reset();
            });

            closeBtn.onclick = function() {
                modal.style.display = 'none';
            }

            profileModal.querySelector('.close').onclick = function() {
                profileModal.style.display = 'none';
            }

            scheduleModal.querySelector('.close').onclick = function() {
                scheduleModal.style.display = 'none';
            }

            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = 'none';
                }
                if (event.target == profileModal) {
                    profileModal.style.display = 'none';
                }
                if (event.target == scheduleModal) {
                    scheduleModal.style.display = 'none';
                }
            }

            sendMessage.onclick = function() {
                const message = userInput.value;
                if (message.trim() !== '') {
                    chatContent.innerHTML += `<p><strong>Vous:</strong> ${message}</p>`;
                    userInput.value = '';
                    setTimeout(() => {
                        const name = modalTitle.textContent.split(' ')[2];
                        const responses = {
                            'Élise': 'Oh, j\'adore votre façon de voir les choses... Dites-m\'en plus...',
                            'Sophie': 'Mmm, votre curiosité est enivrante. Laissez-moi vous faire découvrir de nouvelles sensations...',
                            'Luna': 'Je sens une aura intrigante autour de vous. Laissez-moi vous révéler ce que les étoiles me disent...',
                            'Amelia': 'Fascinant ! Votre esprit aventurier me plaît. Que diriez-vous d\'explorer ensemble des territoires inconnus ?',
                            'Zoé': 'Wow, vous avez du cran ! Que diriez-vous d\'une petite aventure ensemble ?',
                            'Chloé': 'J\'adore votre énergie ! Prêt pour une séance de yoga torride ?',
                            'Isabelle': 'Votre perspicacité m\'intrigue. Discutons des subtilités de l\'amour dans la littérature...'
                        };
                        chatContent.innerHTML += `<p><strong>${name}:</strong> ${responses[name]}</p>`;
                        chatContent.scrollTop = chatContent.scrollHeight;
                    }, 1000);
                }
            }

            userInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendMessage.click();
                }
            });

            themeToggle.addEventListener('click', function() {
                const body = document.body;
                body.classList.toggle('light-mode');
                if (body.classList.contains('light-mode')) {
                    themeToggle.textContent = 'Mode Sombre';
                } else {
                    themeToggle.textContent = 'Mode Clair';
                }
            });
        });