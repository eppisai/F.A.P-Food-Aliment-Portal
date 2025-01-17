<?php
	include("includes/config.php");
	include("includes/classes/Account.php");
	include("includes/classes/Constants.php");
	$account = new Account($con);
	include("includes/handlers/register-handler.php");
	include("includes/handlers/login-handler.php");
	function getInputValue($name) {
		if(isset($_POST[$name])) {
			echo $_POST[$name];
		}
	}
?>

<html>
<head>
	<title>Welcome to F.A.P!</title>

	<link rel="stylesheet" type="text/css" href="registernew.css">

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<script src="assets/js/register.js"></script>
</head>
<body>
	<?php
	if(isset($_POST['registerButton'])) {
		echo '<script>
				$(document).ready(function() {
					$("#loginForm").hide();
					$("#registerForm").show();
				});
			</script>';
	}
	else {
		echo '<script>
				$(document).ready(function() {
					$("#loginForm").show();
					$("#registerForm").hide();
				});
			</script>';
	}
	?>
	

	<div id="background">

		<div id="loginContainer">
			
			<div id="inputContainer">
			<img id="meri" src="data:image/png;base64,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" height="90px" width="90px">
	
				<form id="loginForm" action="register.php" method="POST">
						
					<h2>Login</h2>
					<hr id="poko">
					<p>
						<?php echo $account->getError(Constants::$loginFailed); ?>
						<label for="loginUsername">Username</label>
						<input id="loginUsername" name="loginUsername" type="text" placeholder="e.g. bartSimpson" value="<?php getInputValue('loginUsername') ?>" required>
					</p>
					<p>
						<label for="loginPassword">Password</label>
						<input id="loginPassword" name="loginPassword" type="password" placeholder="Your password" required>
					</p>

					<button type="submit" name="loginButton">LOG IN</button>

					<div class="hasAccountText">
						<span id="hideLogin">Don't have an account yet? Signup here.</span>
					</div>
					
				</form>



				<form id="registerForm" action="register.php" method="POST">
					<h2>Create your free account</h2>
					<p>
						<?php echo $account->getError(Constants::$usernameCharacters); ?>
						<?php echo $account->getError(Constants::$usernameTaken); ?>
						<label for="username">Username</label>
						<input id="username" name="username" type="text" placeholder="e.g. bartSimpson" value="<?php getInputValue('username') ?>" required>
					</p>

					<p>
						<?php echo $account->getError(Constants::$firstNameCharacters); ?>
						<label for="firstName">First name</label>
						<input id="firstName" name="firstName" type="text" placeholder="e.g. Bart" value="<?php getInputValue('firstName') ?>" required>
					</p>

					<p>
						<?php echo $account->getError(Constants::$lastNameCharacters); ?>
						<label for="lastName">Last name</label>
						<input id="lastName" name="lastName" type="text" placeholder="e.g. Simpson" value="<?php getInputValue('lastName') ?>" required>
					</p>

					<p>
						<?php echo $account->getError(Constants::$emailsDoNotMatch); ?>
						<?php echo $account->getError(Constants::$emailInvalid); ?>
						<?php echo $account->getError(Constants::$emailTaken); ?>
						<label for="email">Email</label>
						<input id="email" name="email" type="email" placeholder="e.g. bart@gmail.com" value="<?php getInputValue('email') ?>" required>
					</p>

					<p>
						<label for="email2">Confirm email</label>
						<input id="email2" name="email2" type="email" placeholder="e.g. bart@gmail.com" value="<?php getInputValue('email2') ?>" required>
					</p>

					<p>
						<?php echo $account->getError(Constants::$passwordsDoNoMatch); ?>
						<?php echo $account->getError(Constants::$passwordNotAlphanumeric); ?>
						<?php echo $account->getError(Constants::$passwordCharacters); ?>
						<label for="password">Password</label>
						<input id="password" name="password" type="password" placeholder="Your password" required>
					</p>

					<p>
						<label for="password2">Confirm password</label>
						<input id="password2" name="password2" type="password" placeholder="Your password" required>
					</p>

					<button type="submit" name="registerButton">SIGN UP</button>

					<div class="hasAccountText">
						<span id="hideRegister">Already have an account? Log in here.</span>
					</div>
					
				</form>


			</div>

			<div id="loginText">
				<h1>Suppliers and sellers,we have it all!</h1>
				<hr>
				<h2>Also,Worrying about transportation? well we are here to take care of it!!</h2>
				<ul>
					<li>Discover profits and true potential of your work</li>
					<li>Create various avenues of profits</li>
					<li>Even in adversities we are there for you..</li>
				</ul>
			</div>

		</div>
	</div>

</body>
</html>
