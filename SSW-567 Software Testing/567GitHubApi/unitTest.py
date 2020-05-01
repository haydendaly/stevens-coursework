import unittest

from main import getRepositories

class TestGetRequest(unittest.TestCase):

    def testRichkempinski(self):
        output = """Repo: hellogitworld Number of commits: 30
Repo: helloworld Number of commits: 6
Repo: Mocks Number of commits: 10
Repo: Project1 Number of commits: 2
Repo: threads-of-life Number of commits: 1
"""

        self.assertEqual(getRepositories("richkempinski"), output, "Does not align with output from 9/21/19")

        # Couldn't create test using own repository because I would push right after it was done.

if __name__ == '__main__':
    print('Running unit tests')
    unittest.main()
