<?php

remove_action( 'woocommerce_before_checkout_form', 'woocommerce_checkout_login_form', 10 );
remove_action( 'woocommerce_order_details_after_order_table', 'woocommerce_order_again_button' );

add_filter( 'wc_stripe_icon', 'new_cards');

function new_cards() {

return get_stylesheet_directory_uri() . "/assets/img/cards.png" ;

}

add_filter( 'woocommerce_product_single_add_to_cart_text', 'woo_custom_cart_button_text' );    // 2.1 +
 
function woo_custom_cart_button_text() {
 
  return __( 'Add to Bag', 'woocommerce' );
 
}

function so_28348735_category_based_thank_you_message ( $order_id ){

  $order = wc_get_order( $order_id );

  foreach( $order->get_items() as $item ) {

    $hasContent = false;

    if ( has_term( 'free-lfla-event', 'product_cat', $item['product_id'] ) ) {
      $freeticket = true; $hasContent = true;
    }

    if ( has_term( 'paid-lfla-event', 'product_cat', $item['product_id'] ) ) {
      $paidticket = true; $hasContent = true;
    }

    if ( has_term( 'general-donation', 'product_cat', $item['product_id'] ) ) {
      $donation = true; $hasContent = true;
    }

    if ( has_term( 'membership', 'product_cat', $item['product_id'] ) ) {
      $membership = true; $hasContent = true;
    }

    if ( has_term( 'memorial-gift', 'product_cat', $item['product_id'] ) ) {
      $memGift = true; $hasContent = true;
    }

    if ( has_term( 'young-literati-membership', 'product_cat', $item['product_id'] ) ) {
      $youngLit = true; $hasContent = true;
    }

    if ( has_term( 'gift-membership', 'product_cat', $item['product_id'] ) ) {
      $giftMembership = true; $hasContent = true;
    }

  }

  if ($hasContent === true) {
    echo '<div id="post_confirmation" class="desktop-4 right" style="opacity:0">';
  }

  if ($freeticket === true) {
    include locate_template('templates/thanks/free-event.php' );
  }

  if ($paidticket === true) {
    include locate_template('templates/thanks/paid-event.php' );
  }

  if ($donation === true) {
    include locate_template('templates/thanks/general-donation.php' );
  }

  if ($membership === true) {
    include locate_template('templates/thanks/membership.php' );
  }

  if ($memGift === true) {
    include locate_template('templates/thanks/memorial-gift.php' );
  }

  if ($youngLit === true) {
    include locate_template('templates/thanks/membership-yl.php' );
  }

  if ($giftMembership === true) {
    include locate_template('templates/thanks/membership-gift.php' );
  }

  if ($hasContent === true) {
    echo '</div>';

    ?><script>
      $("#post_confirmation").prependTo('.cart-content .row').css('opacity','1');
    </script><?php

  }
   

}

add_action( 'woocommerce_thankyou', 'so_28348735_category_based_thank_you_message' ); 

/**
 * Plugin Name: WooCommerce Remove Billing Fields for Free Virtual Products
 * Plugin URI: https://gist.github.com/BFTrick/7873168
 * Description: Remove the billing address fields for free virtual orders
 * Author: Patrick Rauland
 * Author URI: http://patrickrauland.com/
 * Version: 2.0
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @author      Patrick Rauland
 * @since   1.0
 */

function patricks_billing_fields( $fields ) {
  global $woocommerce;

  // if the total is more than 0 then we still need the fields
  if ( 0 != $woocommerce->cart->total ) {
    return $fields;
  }

  // return the regular billing fields if we need shipping fields
  if ( $woocommerce->cart->needs_shipping() ) {
    return $fields;
  }

  // we don't need the billing fields so empty all of them except the email
  unset( $fields['billing_country'] );
  //unset( $fields['billing_first_name'] );
  //unset( $fields['billing_last_name'] );
  unset( $fields['billing_company'] );
  unset( $fields['billing_address_1'] );
  unset( $fields['billing_address_2'] );
  unset( $fields['billing_city'] );
  unset( $fields['billing_state'] );
  //unset( $fields['billing_postcode'] );
  unset( $fields['billing_phone'] );

  return $fields;
}
add_filter( 'woocommerce_billing_fields', 'patricks_billing_fields', 20 );


// That's all folks!


add_filter( 'woocommerce_payment_complete_order_status', 'virtual_order_payment_complete_order_status', 10, 2 );
 
function virtual_order_payment_complete_order_status( $order_status, $order_id ) {
  $order = new WC_Order( $order_id );
 
  if ( 'processing' == $order_status &&
       ( 'on-hold' == $order->status || 'pending' == $order->status || 'failed' == $order->status ) ) {
 
    $virtual_order = null;
 
    if ( count( $order->get_items() ) > 0 ) {
 
      foreach( $order->get_items() as $item ) {
 
        if ( 'line_item' == $item['type'] ) {
 
          $_product = $order->get_product_from_item( $item );
 
          if ( ! $_product->is_virtual() ) {
            // once we've found one non-virtual product we know we're done, break out of the loop
            $virtual_order = false;
            break;
          } else {
            $virtual_order = true;
          }
        }
      }
    }
 
    // virtual order, mark as completed
    if ( $virtual_order ) {
      return 'completed';
    }
  }
 
  // non-virtual order, return original status
  return $order_status;
}