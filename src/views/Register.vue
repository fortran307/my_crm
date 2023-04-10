<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
		<div class="card-content">
			<span class="card-title">Домашняя бухгалтерия</span>
			<div class="input-field">
				<input
						id="email"
						type="text"
						v-model="email"
						:class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
				>
				<label for="email">Email</label>
				<small class="helper-text invalid"
				v-if="$v.email.$dirty && !$v.email.required"
				>Введите Email</small>
				<small class="helper-text invalid"
				v-else-if="$v.email.$dirty && !$v.email.email"
				>Не коректный email</small>
			</div>
			<div class="input-field">
				<input
						id="password"
						type="password"
						v-model="password"
						:class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
				>
				<label for="password">Пароль</label>
				<small class="helper-text invalid"
				v-if="$v.password.$dirty && !$v.password.required">
				Введите пароль</small>
				<small class="helper-text invalid"
				v-else-if="$v.password.$dirty && !$v.password.minLength">
				Пароль должен быть длиннее 6 символов</small>
			</div>
			<div class="input-field">
				<input
						id="name"
						type="text"
						v-model="name"
						:class="{invalid: ($v.name.$dirty && !$v.name.required)}"
				>
				<label for="name">Имя</label>
				<small class="helper-text invalid"
				v-if="($v.name.$dirty && !$v.name.required)">
				Введите имя</small>
			</div>
			<p>
				<label>
					<input type="checkbox" 
					v-model="agree"
					/>
					<span>С правилами согласен</span>
				</label>
			</p>
		</div>
		<div class="card-action">
			<div>
				<button
					class="btn waves-effect waves-light auth-submit"
					type="submit"
				>
					Зарегистрироваться
					<i class="material-icons right">send</i>
				</button>
			</div>

			<p class="center">
				Уже есть аккаунт?
				<router-link to="/login">Войти!</router-link>
			</p>
		</div>
	</form>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'

export default {
	data: () => ({
		email: '',
		password: '',
		name: '',
		agree: false
	}),
	validations:{
		email: {email, required},
		password: {required, minLength: minLength(6)},
		name: {required},
		// собственная валидация (в плагине vuelidate такого нет)
		// проверка на значение true
		agree: {checked: v => v}
	},
	methods:{
		submitHandler(){
			// проверка системной переменной котрую мы получаем используя плагин vuelidate
			// находится в состояниии invalid
			if (this.$v.$invalid) {
				// Вызываем метод который позволяет активизировать валидацию
				this.$v.$touch()
				// выходим из метода чтобы дальнейшая логика не вызывалась
				return
			}
			const formData = {
				email: this.email,
				password: this.password,
				name: this.name
			}
			console.log(formData)
			this.$router.push('/')
		}
	}
}
</script>