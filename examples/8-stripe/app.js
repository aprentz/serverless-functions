const purchase = [
   { id: '1', name: 't-shirt', price: 1999 },
   { id: '2', name: 'shoes', price: 4999 },
 ]
 const total_amount = 10998
 const shipping_fee = 1099


const stripe = Stripe("pk_test_51OB5jbFlwxELi2xhPooqP3Qre8iuvS07yQT6PCryNrjjZpRtmCQ2kwBF4LEBC7OUoWBEbJFQzxDqnMzrlu5cqxWw00zdySvWqO");

// The items the customer wants to buy
const items = [{ id: "xl-tshirt", price: "price_CBb6IXqvTLXp3f" }];

let elements;

initialize();
checkStatus();

document
   .querySelector("#payment-form")
   .addEventListener("submit", handleSubmit);

// Fetches a payment intent and captures the client secret
async function initialize() {
   const response = await fetch("/api/8-stripe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ purchase, total_amount, shipping_fee }),
   });
   const { clientSecret } = await response.json();

   const appearance = {
      theme: 'stripe',
      variables: {
        colorPrimary: '#85d996',
        colorText: '#000000',
      },
   };
   elements = stripe.elements({ appearance, clientSecret });

   const paymentElementOptions = {
      layout: "tabs",
   };

   const paymentElement = elements.create("payment", paymentElementOptions);
   paymentElement.mount("#payment-element");
}

async function handleSubmit(e) {
   e.preventDefault();
   setLoading(true);
   const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
         // Make sure to change this to your payment completion page
         return_url: "http://localhost:8888/examples/8-stripe/index.html",
         receipt_email: 'alex.rentz@outlook.com',
      },
   });

   // This point will only be reached if there is an immediate error when
   // confirming the payment. Otherwise, your customer will be redirected to
   // your `return_url`. For some payment methods like iDEAL, your customer will
   // be redirected to an intermediate site first to authorize the payment, then
   // redirected to the `return_url`.
   if (error.type === "card_error" || error.type === "validation_error") {
      showMessage(error.message);
   } else {
      showMessage("An unexpected error occurred.");
   }

   setLoading(false);
}

// Fetches the payment intent status after payment submission
async function checkStatus() {
   const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
   );

   if (!clientSecret) {
      return;
   }

   const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

   switch (paymentIntent.status) {
      case "succeeded":
         showMessage("Payment succeeded!");
         break;
      case "processing":
         showMessage("Your payment is processing.");
         break;
      case "requires_payment_method":
         showMessage("Your payment was not successful, please try again.");
         break;
      default:
         showMessage("Something went wrong.");
         break;
   }
}

// ------- UI helpers -------

function showMessage(messageText) {
   const messageContainer = document.querySelector("#payment-message");

   messageContainer.classList.remove("hidden");
   messageContainer.textContent = messageText;

   setTimeout(function () {
      messageContainer.classList.add("hidden");
      messageContainer.textContent = "";
   }, 4000);
}

// Show a spinner on payment submission
function setLoading(isLoading) {
   if (isLoading) {
      // Disable the button and show a spinner
      document.querySelector("#submit").disabled = true;
      document.querySelector("#spinner").classList.remove("hidden");
      document.querySelector("#button-text").classList.add("hidden");
   } else {
      document.querySelector("#submit").disabled = false;
      document.querySelector("#spinner").classList.add("hidden");
      document.querySelector("#button-text").classList.remove("hidden");
   }
}