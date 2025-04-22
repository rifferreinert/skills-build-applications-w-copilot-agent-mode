from django.test import TestCase
from .models import User, Team, Activity, Leaderboard, Workout

class UserModelTest(TestCase):
    def test_user_creation(self):
        user = User.objects.create(username="testuser", email="testuser@example.com", password="password123")
        self.assertEqual(user.username, "testuser")
        self.assertEqual(user.email, "testuser@example.com")

class TeamModelTest(TestCase):
    def test_team_creation(self):
        user = User.objects.create(username="testuser", email="testuser@example.com", password="password123")
        team = Team.objects.create(name="Test Team")
        team.members.add(user)
        self.assertEqual(team.name, "Test Team")
        self.assertIn(user, team.members.all())

class ActivityModelTest(TestCase):
    def test_activity_creation(self):
        user = User.objects.create(username="testuser", email="testuser@example.com", password="password123")
        activity = Activity.objects.create(user=user, activity_type="Running", duration="01:00:00")
        self.assertEqual(activity.activity_type, "Running")
        self.assertEqual(activity.user, user)

class LeaderboardModelTest(TestCase):
    def test_leaderboard_creation(self):
        user = User.objects.create(username="testuser", email="testuser@example.com", password="password123")
        leaderboard = Leaderboard.objects.create(user=user, score=100)
        self.assertEqual(leaderboard.score, 100)
        self.assertEqual(leaderboard.user, user)

class WorkoutModelTest(TestCase):
    def test_workout_creation(self):
        workout = Workout.objects.create(name="Test Workout", description="A test workout description")
        self.assertEqual(workout.name, "Test Workout")
        self.assertEqual(workout.description, "A test workout description")